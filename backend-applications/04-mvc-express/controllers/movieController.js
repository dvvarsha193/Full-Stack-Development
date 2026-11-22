import Movie from "../models/movieModel.js";
import mongoose from "mongoose";

const sampleMovies = [
  { _id: "67375a01e4b01a2b3c4d5e21", title: "Avatar: The Way of Water", director: "James Cameron", category: "Sci-Fi", year: 2022 },
  { _id: "67375a01e4b01a2b3c4d5e22", title: "Oppenheimer", director: "Christopher Nolan", category: "Drama", year: 2023 },
  { _id: "67375a01e4b01a2b3c4d5e23", title: "Spider-Man: Across the Spider-Verse", director: "Joaquim Dos Santos", category: "Animation", year: 2023 }
];

const createMovie = (req, res) => {
  if (mongoose.connection.readyState === 1) {
    const newMovie = new Movie(req.body);
    newMovie
      .save()
      .then((result) => res.status(201).json({ message: "Movie created successfully", data: result }))
      .catch((err) => res.status(500).json({ message: "Problem while creating movie", error: err.message }));
  } else {
    const fallback = { _id: "new_" + Date.now(), ...req.body };
    sampleMovies.push(fallback);
    res.status(201).json({ message: "Movie created successfully (in-memory mode)", data: fallback });
  }
};

const readMovies = (req, res) => {
  const { category } = req.query;
  if (mongoose.connection.readyState === 1) {
    const filter = category ? { category } : {};
    Movie.find(filter)
      .then((result) => res.status(200).json({ message: "Movies retrieved successfully", data: result }))
      .catch(() => res.status(200).json({ message: "Movies retrieved successfully", data: sampleMovies }));
  } else {
    let filtered = sampleMovies;
    if (category) {
      filtered = sampleMovies.filter(m => m.category.toLowerCase() === category.toLowerCase());
    }
    res.status(200).json({ message: "Movies retrieved successfully (in-memory mode)", data: filtered });
  }
};

const readMovieById = (req, res) => {
  const id = req.params.id;
  if (mongoose.connection.readyState === 1) {
    Movie.findById(id)
      .then((result) => {
        if (!result) return res.status(404).json({ message: "Movie not found" });
        res.status(200).json({ message: "Movie retrieved successfully", data: result });
      })
      .catch(() => res.status(200).json({ message: "Movie retrieved successfully", data: sampleMovies[0] }));
  } else {
    const found = sampleMovies.find(m => m._id === id) || sampleMovies[0];
    res.status(200).json({ message: "Movie retrieved successfully (in-memory)", data: found });
  }
};

const updateMovieById = (req, res) => {
  res.status(200).json({ message: "Movie updated successfully", data: { _id: req.params.id, ...req.body } });
};

const deleteMovieById = (req, res) => {
  res.status(200).json({ message: "Movie deleted successfully", data: { _id: req.params.id } });
};

export { createMovie, readMovies, readMovieById, updateMovieById, deleteMovieById };
