import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectionString = process.env.MONGO_ATLAS_CONNECTION

try {
    await mongoose.connect(connectionString)
    console.log("Conectado a Mongo Atlas");
} catch (error) {
    console.log(error);
}