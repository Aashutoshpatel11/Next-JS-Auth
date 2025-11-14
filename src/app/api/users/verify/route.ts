import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import { User } from "@/models/user.model";

connectDB()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        console.log("REQBODY :: :: :: :: ", reqBody );
        const {token} = reqBody

        const user = await User.findOne({verifyToken: token})

        if(!user){
            return NextResponse.json(
                {message: "no user found! Try Again"},
                {status: 401}
            )
        }
        if( Date.now().toString() > user.verifyTokenExpiry ){
            return NextResponse.json(
                {message: "Token Expired! Try Again"},
                {status: 401}
            )
        }

        user.isVerified = true;
        user.verifyToken = "";
        user.verifyTokenExpiry = "";

        const VerifiedUser = await user.save({validateBeforeSave: false})

        if(!VerifiedUser){
            return NextResponse.json(
                {message: "User not verified due to some error"},
                {status: 401}
            )
        }

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })
        
    } catch (error) {
        console.log("Something went wrong while verifying User :: ", error);
        return NextResponse.json(
            {message: "Something went wrong while verifying User"},
            {status: 401}
        )
        
    }
}