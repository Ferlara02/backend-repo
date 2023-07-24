import mongoose from "mongoose";

const cartInProdSchema =  new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
})


const cartSchema = new mongoose.Schema({
    products: {type: [cartInProdSchema], required: true},
})

export const CartModel = mongoose.model("carts", cartSchema)

