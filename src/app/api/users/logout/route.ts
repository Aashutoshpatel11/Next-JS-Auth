import { NextResponse, NextRequest,  } from "next/server";

export async function POST() {
    try {
        const response = NextResponse
        .json(
            {message: "User Logged Out Successfully"},
            {status:200}
        ).cookies.set("token", "", {
            httpOnly: true
        })
    
        return response
    } catch (error) {
        console.log("Error Occured while Logging Out :: ",error);
        return NextResponse.json(
            {message: "Error Occured while Logging Out"},
            {status: 401},
        )        
    }
}