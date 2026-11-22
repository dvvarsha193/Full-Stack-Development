import mongoose from "mongoose";

const connectDB = (mongoUri) => {
  mongoose.set('bufferCommands', false);
  mongoose
    .connect(mongoUri, { serverSelectionTimeoutMS: 1000 })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Running without live MongoDB (resilient mode)");
    });
};

export default connectDB;
