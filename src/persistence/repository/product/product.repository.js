import factory from "../../daos/factory.js";
import ProductDTO from "../../dtos/product/product.req.dto.js";
const {prodDao} = factory
import ProductResDTO from "../../dtos/product/product.res.dto.js";

export default class ProductRepository {
    constructor() {
        this.dao = prodDao
    }

    async getByIdDTO(id) {
        try {
            const response = await this.dao.getById(id)
            return new ProductResDTO(response)
        } catch (error) {
            console.log(error);
        }
    }

    async createProdDTO(obj) {
        try {
            const prodDTO = new ProductDTO(obj)
            const response = await this.dao.create(prodDTO)
            return response
        } catch (error) {
            console.log(error);
        }
    }

} 