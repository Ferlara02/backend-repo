import { Schema, model } from "mongoose";

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
        default: 0
    },
    password: { 
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "carts",
    },
    isGithub: {
        type: Boolean,
        required: true,
        default: false
    },
    last_connection: {
        type: Date,
        default: Date.now
    },
});

export const UserModel = model('users', userSchema);