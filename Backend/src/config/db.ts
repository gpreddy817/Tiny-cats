import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tiny-cats");
    console.log("mongodb connected");
  } catch (error) {
    console.log("error in mongodb ", error);
  }
};
