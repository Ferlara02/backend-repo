import mongoose from "mongoose";
import config from "../../config.js";

export const connectionString = config.MONGO_ATLAS_CONNECTION

export const initMongoDB = async() => {
    try {
        await mongoose.connect(connectionString)
        console.log("Conectado a Mongo Atlas");
    } catch (error) {
        console.log(error);
    }
}
