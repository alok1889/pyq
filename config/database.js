import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  //if the database is already connected dont connect again
  if (connected) {
    console.log("Mongodb already connected..");
    return;
  }

  //connect MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("MongoDB COnnected..");
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
