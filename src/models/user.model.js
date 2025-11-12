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
    verifyToken: {
        type: String
    },
    verifyTokenExpiry: String,
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: String


}, {timestamps: true})


// Next js runs on edge i.e (it uses edge compiuting) so it hot reloads the code on every change
// So to avoid overwriting the model we check if the model already exists or not
export const User = mongoose.models.users ||  mongoose.model('User', userSchema)
