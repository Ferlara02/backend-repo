import persistence from "../persistence/daos/factory.js"
const {prodDao} = persistence
import ProductRepository from "../persistence/repository/product/product.repository.js"
import { generateProduct } from "../utils/mock.products.js"
const prodRepository = new ProductRepository()


export const getAll = async(page, limit, category, available, sort) => {
    try {
        const response = await prodDao.getAll(page, limit, category, available, sort)
        const result = {
            payload: response.docs,
            status: "success",
            totalPages: response.totalPages,
            prevPage: response.prevPage,
            nextPage: response.nextPage,
            page: response.page,
            hasPrevPage: response.hasPrevPage,
            hasNextPage: response.hasNextPage,
            prevLink: response.hasPrevPage
                ? `http://localhost:8080/products?page=${response.prevPage}`
                : null,
            nextLink: response.hasNextPage
                ? `http://localhost:8080/products?page=${response.nextPage}`
                : null,
        }
        return result

    } catch (error) {
        throw new Error(error.message);
    }
}

export const getById = async(id) => {
    try {
        const item = await prodDao.getById(id)
        if(!item) return false
        else return item
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getByIdDTO = async(id) => {
    try {
        const prod = await ProductRepository.getByIdDTO(id)
        if(!prod) return false
        else return prod 
    } catch (error) {
        throw new Error(error.message);
    }
}

export const create = async(obj) => {
    try {
        const newProd = await prodDao.create(obj)
        if(!newProd) return false 
        else return newProd
    } catch (error) {
        throw new Error(error.message);
    }
}

export const createMock = async() => {
    try {
        const products = []
        for(let i = 0; i < 100; i++) {
            const product = generateProduct()
            products.push(product)
        }
        return products
    } catch (error) {
        throw new Error(error.message)
    }
}

export const createProdDTO = async(obj) => {
    try {
        const newProd = await prodRepository.createProdDTO(obj)
        if(!newProd) return false
        else return newProd
    } catch (error) {
        throw new Error(error.message);
    }
}

export const update = async(id, obj) => {
    try {
        const item = await prodDao.update(id, obj)
        return item
    } catch (error) {
        throw new Error(error.message);
    }
}

export const remove = async(id) => {
    try {
        const itemDeleted = await prodDao.delete(id)
        return itemDeleted
    } catch (error) {
        throw new Error(error.message);
    }
}