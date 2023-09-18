import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDB {
    async getProducts() {
        try {
          const response = await ProductModel.find({});
          return response;
        } catch (error) {
          console.log(error);
        }
    }

    async getAll(
        page = 1, 
        limit = 10, 
        category = null, 
        available = null, 
        sort = "asc"
    ){
        try {
            if (available === "true") available = true;
            if (available === "false") available = false;    
            const filterOptions = {
                ...(category !== null && { category: { $eq: category }}),
                ...(available !== null && {
                  stock: { ...(available ? { $gt: 0 } : { $eq: 0 })},
                }),
            };
            const response = await ProductModel.paginate(filterOptions, { page, limit, sort: {price: sort}, lean: true })
            return response
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id){
        try {
            const response = await ProductModel.findById(id)
            return response
        } catch (error) {
            console.log(error);
        }
    }
    async create(obj){
        try {
            const response = await ProductModel.create(obj)
            return response
        } catch (error) {
            console.log(error);
        }
    }
    async update(id, obj){
        try {
            const response = await ProductModel.findByIdAndUpdate(id, obj, {new: true})
            return response
        } catch (error) {
            console.log(error);
        }
    }
    async delete(id){
        try {
            const response = await ProductModel.findByIdAndDelete(id)
            return response
        } catch (error) {
            console.log(error);
        }
    }
    // async aggregation(category, status, sort) {
    //     const response = await ProductModel.aggregate([
    //         {
    //             $match: {category: category}
    //         }
    //     ])
    // }
}