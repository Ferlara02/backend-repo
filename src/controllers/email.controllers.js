import { mailOptions, transporter } from "../services/email.service.js";
import "dotenv/config"
import { logger } from "../utils/winston.config.js"

export const sendMailEthereal = async(req, res) => {
    try {
        // const response = await transporter.sendMail(mailOptions)
        // console.log("Mail enviado");
        // res.json(response)
        const {dest, name} = req.body
        const gmailOptions = {
            from: process.env.EMAIL,
            to: dest,
            subject: "Bienvenido",
            html: `<h1>Hola ${name}!</h1>`
        }
        const response = await transporter.sendMail(gmailOptions)
        res.json(response)
    } catch (error) {
        logger.error(error.message)
    }
}