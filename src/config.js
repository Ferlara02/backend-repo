import "dotenv/config"

export default {
    MONGO_ATLAS_CONNECTION: process.env.MONGO_ATLAS_CONNECTION,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    SECRET_KEY_JWT: process.env.SECRET_KEY_JWT,
    SECRET_COOKIES: process.env.SECRET_COOKIES
}