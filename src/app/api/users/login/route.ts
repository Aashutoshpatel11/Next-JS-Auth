import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

connectDB()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody
    
        if(!email || !password){
            return NextResponse.json(
                {error: "Both email and password are required"},
                {status: 401}
            )
        }
    
        const user = await User.findOne({ email: email })
    
        if(!user){
            return NextResponse.json(
                {error: "User doens't exits! Kindly SignUp"},
                {status: 401}
            )
        }
    
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
    
        if(!isPasswordCorrect){
            return NextResponse.json(
                {error: "Password is incorrect"},
                {status: 404}
            )
        }
    
        if(!user.isVerified){
            return NextResponse.json(
                {error: "User is not Verified"},
                {status: 400}
            )
        }
    
        const tokenData = {
            "id": user._id,
            "email": user.email,
            "username": user.username
        }
    
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'} )
    
        const response = NextResponse
        .json(
            {message: "User Logged in successfully"},
            {status: 200}
        )
        .cookies.set("token", token, {
            httpOnly: true
        })
    
        return response
    } catch (error) {
        console.log("Error Occured while Logging In :: ",error);
        return NextResponse.json(
            {message: "Error Occured while Logging In"},
            {status: 401},
        )  
    }

}