import ProductDaoMongoDB from "./mongodb/product.dao.js";
import UserDao from "./mongodb/user.dao.js";
import CartDaoMongoDB from "./mongodb/cart.dao.js";
import ProductManager from "./filesystem/product.dao.js";
import CartManager from "./filesystem/cart.dao.js";
import { initMongoDB } from "./mongodb/connection.js";
import TicketMongoDB from "./mongodb/ticket.dao.js";
let userDao
let prodDao
let cartDao
let ticketDao
let persistence = process.argv[2]

switch (persistence) {
    case "file":
        userDao = new UserManager()
        prodDao = new ProductManager()
        cartDao = new CartManager()
        console.log(persistence);
        break;
    case "mongo":
        await initMongoDB()
        userDao = new UserDao()
        prodDao = new ProductDaoMongoDB()
        cartDao = new CartDaoMongoDB()
        ticketDao = new TicketMongoDB()
        console.log(persistence);
        break;
    default:
        await initMongoDB()
        userDao = new UserDao()
        prodDao = new ProductDaoMongoDB()
        cartDao = new CartDaoMongoDB()
        ticketDao = new TicketMongoDB()
        console.log(persistence);
        break;
}

export default { userDao, cartDao, prodDao, ticketDao }