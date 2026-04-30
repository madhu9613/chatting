import mongoose from "mongoose";

const connectDB = async () => {

    const url=process.env.MONGO_URL ;
console.log("MONGO_URL:", url); // Debugging line to check the value of MONGO_URL   
    if(!url){
        throw new Error("MONGO_URL is not defined in environment variables");
    }

  try {
    await mongoose.connect(url  , {
      dbName: "chatting",
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;