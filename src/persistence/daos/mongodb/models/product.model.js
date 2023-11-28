import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
    category: { type: String, required: true, max: 100 },
    code: { type: String, required: true, max: 100, unique: true },
    stock: { type: Number, required: true },
    thumbnails: { type: Array, required: true },
    owner: { type: String, default: 'admin'},
    status: { type: Boolean, required: true },
})

productSchema.plugin(mongoosePaginate) //plugin de paginacion

export const ProductModel = mongoose.model("products", productSchema)

