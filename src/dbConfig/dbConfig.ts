import { log } from "console";
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!)

        mongoose.connection.on("error", (err:any) => {
            console.log(`something went wrong while connecting to BD:: ERROR :: ${err}`);
            process.exit()
        })

        mongoose.connection.on('connected', () => 
            console.log('DB connected successfully')
        );

    } catch (err) {
        console.log(`something went wrong while connecting to BD:: ERROR :: ${err}`);
    }
}