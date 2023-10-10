import { Router } from "express";
const router = Router()
import { __dirname } from "../utils.js";
import * as userService from "../services/user.services.js"
import * as prodService from "../services/product.services.js"
import * as cartService from "../services/cart.services.js"


router.get('/products', async(req, res) => {

    const user = await userService.getById(req.session.passport?.user)
    console.log("USER DESDE VIEWS", user);
    const { page, limit, category, available, sort } = req.query
    const {first_name, age, last_name, email, role} = user
    const response = await prodService.getAll(page, limit, category, available, sort)

    const productsList = response.payload

    res.render('products', {
        user,
        first_name, age, last_name, email, role, 
        productsList, 
        totalPages: response.totalPages, 
        currentPage: response.page, 
        prevPage: response.prevPage, 
        nextPage: response.nextPage, 
        hasPrevPage: response.hasPrevPage, 
        hasNextPage: response.hasNextPage, 
        prevLink: response.prevLink, 
        nextLink: response.nextLink
    })
})

router.get("/cart/:id", async(req, res) => {
    const {id} = req.params
    const cart = await cartService.getById(id)
    const cartProds = cart.products?.map((prod) => ({
        ...prod.id,
        quantity: prod.quantity,
        total: prod.id.price * prod.quantity
    }))
    console.log(cartProds);
    res.render("cart", {idCart: cart._id, cartProds})
})

router.get('/realTimeProducts', async(req, res) => {
    res.render('realTimeProducts')
})


router.get("/register", (req, res) => {
    res.render("register");
});
  
router.get("/error-auth-to-register", (req, res) => {
    res.render("errorRegister");
});
  
router.get("/login", (req, res) => {
    res.render("login");
});
  
router.get("/error-auth-to-login", (req, res) => {
    res.render("errorLogin");
});

router.get("/new-pass", (req, res) => {
    res.render("newPass")
})
  
export default router