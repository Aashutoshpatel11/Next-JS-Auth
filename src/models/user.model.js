import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Please provide a username"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please provide a email"]
    },
    password: {
        type: String,
        required: [true, "Please provide a email"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isadmin: {
        type: Boolean,
        default: false
    },
    verifyToken: String,
    verifyTokenExpiry: String,
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: String


}, {timestamps: true})

export const User = mongoose.model('User', userSchema)
