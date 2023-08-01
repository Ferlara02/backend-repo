
import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";

const prodDao = new ProductDaoMongoDB()

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
                ? `http://localhost:8080/views/products?page=${response.prevPage}`
                : null,
            nextLink: response.hasNextPage
                ? `http://localhost:8080/views/products?page=${response.nextPage}`
                : null,
        }
        return result
        
    } catch (error) {
        console.log(error);
    }
}

export const getById = async(id) => {
    try {
        const item = await prodDao.getById(id)
        if(!item) return false
        else return item
    } catch (error) {
        console.log(error);
    }
}

export const create = async(obj) => {
    try {
        const newProd = await prodDao.create(obj)
        if(!newProd) return false 
        else return newProd
    } catch (error) {
        console.log(error);
    }
}

export const update = async(id, obj) => {
    try {
        const item = await prodDao.update(id, obj)
        return item
    } catch (error) {
        console.log(error);
    }
}

export const remove = async(id) => {
    try {
        const itemDeleted = await prodDao.delete(id)
        return itemDeleted
    } catch (error) {
        console.log(error);
    }
}