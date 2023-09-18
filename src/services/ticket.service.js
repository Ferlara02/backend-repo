import persistence from "../persistence/daos/factory.js"
const { ticketDao, prodDao, userDao, cartDao } = persistence 

export const generateTicket = async(userId) => {
    try {
        const user = await userDao.getById(userId)
        if(!user) return false
        let amountAcc = 0
        let cart = await cartDao.getCart(user?.cart)
        for (const prod of cart.products) {
            const idProd = prod.id._id.toString()
            console.log("ID PRODUCTO ", idProd);
            const prodDB = await prodDao.getById(idProd)
            if(prod.quantity <= prodDB.stock) {
                prodDB.stock -= prod.quantity
                prodDB.save()
                const amount = prod.quantity * prodDB.price
                amountAcc += amount
            }
        }
        if(cart.products.length) { //para evitar que cree tickets si no hay productos en el carrito
            const ticket = await ticketDao.create({
                code: `${Math.random()}`,
                purchase_datetime: new Date().toLocaleString(),
                amount: amountAcc,
                purchaser: user.email
            })
            await cartDao.delete(user.cart)
            return ticket
        }
    } catch (error) {
        console.log(error);
    }
}