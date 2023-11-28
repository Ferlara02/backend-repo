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

export const mailUserDeleted = {
    html: `<h1>Hola, `
}

const createMsgRegister = (first_name) => {
    return `<h1>Hola ${first_name}, ¡Bienvenido/a al eCommerce!</h1>`
};

const createMsgReset = (first_name) => {
    return `<h1>Hola, ${first_name}. Hace click <a href="http://localhost:8080/new-pass"> AQUÍ </a> para restablecer tu contraseña. </h1>`
}

const createMsgUserDeleted = (first_name) => {
    return `<h1>Hola, ${first_name}. </h1>
    <p>Tu cuenta ha sido removido de nuestra base de datos debido a una inactividad en nuestra página de más de dos días.</p>
    <p>Atentamente, tu eCommerce preferido.</p>`
}

const createMsgProdDeleted = (first_name) => {
    return `<h1>Hola, ${first_name}. </h1>
    <p>El producto de tu propiedad ha sido eliminado de nuestra base de datos por un admin.</p>
    <p>Atentamente, tu eCommerce preferido.</p>`
}

export const sendMail = async(user, service, token = null) => {
    try {
       const {first_name, email} = user;
       
       let msg = '';
       service === 'register'
       ? msg = createMsgRegister(first_name)
       : service === 'resetPass'
       ? msg = createMsgReset(first_name)
       : service === "prodDelete"
       ? msg = createMsgProdDeleted(first_name)
       : msg = createMsgUserDeleted(first_name);
       
       let subj = "";
       subj = service === "register" ? "Bienvenido/a" : service === "resetPass" ? "Restablecimiento de contraseña" : "Tu cuenta ha sido removida"

       const gmailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: subj,
            html: msg
       }

       const response = await transporter.sendMail(gmailOptions)
       if(token !== null) return token
       console.log("Email enviado");
    } catch (error) {
        throw new Error(error.message)
    }
} 