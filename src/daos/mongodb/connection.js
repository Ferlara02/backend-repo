import mongoose from "mongoose";

const connectionString = "mongodb+srv://ferlara022:Fernandolara135@ecommerce.zmsg5jz.mongodb.net/"

try {
    await mongoose.connect(connectionString)
    console.log("Conectado a Mongo Atlas");
} catch (error) {
    console.log(error);
}