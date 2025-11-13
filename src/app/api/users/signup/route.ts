import { NextResponse, NextRequest } from "next/server";
import { User } from "@/models/user.model"
import bcrypt from "bcryptjs";
import { sendMail } from "@/utils/mailer";
import { connectDB } from "@/dbConfig/dbConfig";
import { log } from "console";

connectDB()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, username, password} = reqBody;
    
        const user = await User.findOne({
            $or: [{email}, {username}]
        })
    
        if(user){
            return NextResponse.json(
                {error: "user already exits"},
                {status: 400}
            )
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
    
        const newUser = new User({
            email,
            username,
            password: hashedPassword
        })
        console.log("NEW USER :: ", newUser);
        
        const savedUser = await newUser.save({validateBeforeSave: false})

        console.log("SAVED USER :: ", savedUser);
    
        sendMail({email, emailType: "VERIFY", userId: savedUser._id})
        
        return NextResponse.json({
            message: "New User Registered successfully",
            status: 200,
            data: savedUser
        })
    } catch (error) {
        console.log("error occured during user registration::", error)
        throw error
    }
}