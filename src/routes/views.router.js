import { Router } from "express";
const router = Router()
import { __dirname } from "../utils.js";

router.get('/', async(req, res) => {
    const userFound = {name: 'Fer', lastname: 'Lara'}
    res.render('home', {userFound})
})

export default router