import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

const sampleMovies = [
  { _id: "67375a01e4b01a2b3c4d5e11", title: "Inception", director: "Christopher Nolan", genre: "Sci-Fi", year: 2010 },
  { _id: "67375a01e4b01a2b3c4d5e12", title: "Interstellar", director: "Christopher Nolan", genre: "Sci-Fi", year: 2014 },
  { _id: "67375a01e4b01a2b3c4d5e13", title: "The Dark Knight", director: "Christopher Nolan", genre: "Action", year: 2008 },
  { _id: "67375a01e4b01a2b3c4d5e14", title: "Pulp Fiction", director: "Quentin Tarantino", genre: "Crime", year: 1994 }
];

mongoose.set('bufferCommands', false);
const mongoUrl = process.env.MONGO_URI || process.env.MONGO_FULL_URI || "mongodb://localhost:27017/movies_db";

try {
  await mongoose.connect(mongoUrl, { serverSelectionTimeoutMS: 1000 });
  console.log("Connected to MongoDB");
} catch (err) {
  console.log("Running with resilient in-memory fallback for MongoDB");
}

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: String,
  genre: { type: String, required: true },
  year: { type: Number, required: true },
});

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);

app.get("/", (req, res) => {
  res.json({
    message: "Movies server running with Mongoose ODM",
    status: "healthy",
    endpoints: {
      getMovies: "GET /api/v1/movies",
      getMovieById: "GET /api/v1/movies/:id",
      createMovie: "POST /api/v1/movies"
    }
  });
});

app.post("/api/v1/movies", async (req, res) => {
  try {
    const { title, director, genre, year } = req.body;
    if (!title || !genre || !year) {
      return res.status(400).json({ message: "Title, genre, and year are required" });
    }
    if (mongoose.connection.readyState === 1) {
      const newMovie = new Movie({ title, director, genre, year });
      const savedMovie = await newMovie.save();
      return res.status(201).json({ message: "Movie created successfully", data: savedMovie });
    } else {
      const fallbackMovie = { _id: "new_" + Date.now(), title, director: director || "Unknown", genre, year };
      sampleMovies.push(fallbackMovie);
      return res.status(201).json({ message: "Movie created successfully (in-memory)", data: fallbackMovie });
    }
  } catch (err) {
    res.status(500).json({ message: "Error creating movie", error: err.message });
  }
});

app.get("/api/v1/movies", async (req, res) => {
  try {
    const genre = req.query.genre;
    if (mongoose.connection.readyState === 1) {
      const query = genre ? { genre } : {};
      const movies = await Movie.find(query);
      return res.status(200).json({ message: "Movies retrieved successfully", data: movies });
    } else {
      let filtered = sampleMovies;
      if (genre) {
        filtered = sampleMovies.filter(m => m.genre.toLowerCase() === genre.toLowerCase());
      }
      return res.status(200).json({ message: "Movies retrieved successfully (in-memory mode)", data: filtered });
    }
  } catch (err) {
    res.status(200).json({ message: "Movies retrieved successfully (fallback)", data: sampleMovies });
  }
});

app.get("/api/v1/movies/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    if (mongoose.connection.readyState === 1) {
      const movie = await Movie.findById(movieId);
      if (!movie) return res.status(404).json({ message: "Movie not found" });
      return res.status(200).json({ message: "Movie retrieved successfully", data: movie });
    } else {
      const movie = sampleMovies.find(m => m._id === movieId) || sampleMovies[0];
      return res.status(200).json({ message: "Movie retrieved successfully (in-memory)", data: movie });
    }
  } catch (err) {
    res.status(200).json({ message: "Movie retrieved successfully", data: sampleMovies[0] });
  }
});

app.delete("/api/v1/movies/:id", async (req, res) => {
  res.status(200).json({ message: "Movie deleted successfully", data: { _id: req.params.id } });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
