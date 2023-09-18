import { createTransport } from "nodemailer";
import "dotenv/config"

export const transporter = createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

export const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: "Bienvenido",
    // text: "Este es el texto del mail",
    html: `<h1>Bienvenido</h1>`,
    attachments: [
        {
            path: process.cwd() + "/src/services/adjunto.txt",
            filename: "adjunto"
        }
    ]
}