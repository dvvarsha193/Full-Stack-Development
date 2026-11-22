import mongoose from "mongoose";

const connectDB = (mongoUri) => {
  if (!mongoUri || mongoUri.includes("localhost")) {
    console.log("No cloud MongoDB URI provided; using in-memory store");
    return Promise.resolve();
  }
  mongoose.set('bufferCommands', false);
  return mongoose
    .connect(mongoUri, { serverSelectionTimeoutMS: 1000 })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Running without live MongoDB (resilient mode)");
    });
};

export default connectDB;
