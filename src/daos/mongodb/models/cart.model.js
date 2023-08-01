import mongoose from "mongoose";

const CartsSchema =  new mongoose.Schema({
    products: [
        {
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
            _id: false
        }
    ]
})


// CartsSchema.pre('find', function(){
//     this.populate('products.id')
// })


export const CartModel = mongoose.model("carts", CartsSchema)

