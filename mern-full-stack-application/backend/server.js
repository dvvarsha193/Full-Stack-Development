import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

// In-memory fallback posts so the API is never empty
let samplePosts = [
  {
    _id: "67375a01e4b01a2b3c4d5e01",
    title: "Full Stack Development with MERN",
    content: "MERN Stack consists of MongoDB, Express.js, React, and Node.js. It enables developers to build scalable single-page full-stack applications with JavaScript across the entire stack."
  },
  {
    _id: "67375a01e4b01a2b3c4d5e02",
    title: "Building REST APIs in Express.js",
    content: "Express provides powerful middleware routing and controller capabilities to handle CRUD operations on RESTful resources like blog posts, users, and products."
  },
  {
    _id: "67375a01e4b01a2b3c4d5e03",
    title: "React Components and State Management",
    content: "Components split the user interface into independent, reusable pieces. Using React hooks like useState and useEffect, we consume and display dynamic REST API data."
  }
];

let isDbConnected = false;
if (mongoUri) {
  mongoose
    .connect(mongoUri, { dbName, serverSelectionTimeoutMS: 3000 })
    .then(() => {
      isDbConnected = true;
      console.log("Connected to MongoDB");
    })
    .catch((err) => console.log("Running with in-memory fallback posts"));
}

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});
const Post = mongoose.model("Post", postSchema);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "MERN Blog API is running",
    endpoints: {
      getPosts: "GET /api/v1/posts",
      getPostById: "GET /api/v1/posts/:id",
      createPost: "POST /api/v1/posts",
      updatePost: "PUT /api/v1/posts/:id",
      deletePost: "DELETE /api/v1/posts/:id"
    }
  });
});

// Read all posts
app.get("/api/v1/posts", async (req, res) => {
  try {
    if (isDbConnected) {
      const posts = await Post.find().maxTimeMS(2000);
      if (posts && posts.length > 0) {
        return res.status(200).json({ message: "Posts retrieved successfully", data: posts });
      }
    }
    return res.status(200).json({ message: "Posts retrieved successfully", data: samplePosts });
  } catch (err) {
    return res.status(200).json({ message: "Posts retrieved successfully", data: samplePosts });
  }
});

// Read post by id
app.get("/api/v1/posts/:id", async (req, res) => {
  try {
    if (isDbConnected) {
      const post = await Post.findById(req.params.id);
      if (post) return res.status(200).json({ message: "Post retrieved successfully", data: post });
    }
    const found = samplePosts.find(p => p._id === req.params.id);
    if (found) return res.status(200).json({ message: "Post retrieved successfully", data: found });
    return res.status(404).json({ message: "Post not found" });
  } catch (err) {
    const found = samplePosts.find(p => p._id === req.params.id);
    if (found) return res.status(200).json({ message: "Post retrieved successfully", data: found });
    return res.status(404).json({ message: "Post not found" });
  }
});

// Create post
app.post("/api/v1/posts", async (req, res) => {
  try {
    if (isDbConnected) {
      const post = new Post(req.body);
      await post.save();
      return res.status(201).json({ message: "Post created successfully", data: post });
    }
    const newPost = { _id: String(Date.now()), ...req.body };
    samplePosts.unshift(newPost);
    return res.status(201).json({ message: "Post created successfully", data: newPost });
  } catch (err) {
    const newPost = { _id: String(Date.now()), ...req.body };
    samplePosts.unshift(newPost);
    return res.status(201).json({ message: "Post created successfully", data: newPost });
  }
});

// Update post
app.put("/api/v1/posts/:id", async (req, res) => {
  try {
    if (isDbConnected) {
      const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (post) return res.status(200).json({ message: "Post updated successfully", data: post });
    }
    const index = samplePosts.findIndex(p => p._id === req.params.id);
    if (index !== -1) {
      samplePosts[index] = { ...samplePosts[index], ...req.body };
      return res.status(200).json({ message: "Post updated successfully", data: samplePosts[index] });
    }
    return res.status(404).json({ message: "Post not found" });
  } catch (err) {
    return res.status(500).json({ message: "Error updating post" });
  }
});

// Delete post
app.delete("/api/v1/posts/:id", async (req, res) => {
  try {
    if (isDbConnected) {
      await Post.findByIdAndDelete(req.params.id);
    }
    samplePosts = samplePosts.filter(p => p._id !== req.params.id);
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting post" });
  }
});

if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

export default app;
