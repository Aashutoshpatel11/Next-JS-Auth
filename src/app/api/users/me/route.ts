import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import { getUserIdFromToken } from "@/utils/getUserIdFromToken";
import { User } from "@/models/user.model";

export async function GET(request:NextRequest){
    try {
        const userId = await getUserIdFromToken(request)
        const user = await User.findById(userId).select("-password -verifyToken -verifyTokenExpiry -forgetPasswordToken -forgetPasswordTokenExpiry")

        if(!user){
            return NextResponse.json(
                {message: "User doesn't exists or Token is expired"},
                {status: 401}
            )
        }
        return NextResponse.json(
            {
                message: "Logged in user details fetched successfully",
                data: user
            },
            {status: 200}
        )

    } catch (error) {
        console.log("Error occured while fetching logged in user details :: ", error);
        return NextResponse.json(
            {message: "Error occured while fetching logged in user details"},
            {status: 401}
        )
    }
}