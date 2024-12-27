import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Database Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
