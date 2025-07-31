import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  // check for mongodb url
  if (!process.env.MONGODB_URL) {
    return console.log("MongoDB Url is missing");
  }
  // check if lready connected

  if (isConnected) {
    return console.log("MongoDb is already connected");
  }

  // establish connection with database

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "invoice-app",
    });
    isConnected = true;
    console.log("MongoDb is connected");
  } catch (error) {
    console.log("MongoDb connection failed", error);
  }
};
