import { log } from "console";
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connectionString = await mongoose.connect(`${process.env.DATABASE_URI}/${process.env.DB_NAME}`)

        connectionString.connection.on("error", (err:any) => {
            console.log(`something went wrong while connecting to BD:: ERROR :: ${err}`);
            process.exit()
        })

        connectionString.connection.on('connected', () => 
            console.log('DB connected successfully')
        );

    } catch (err) {
        console.log(`something went wrong while connecting to BD:: ERROR :: ${err}`);
    }
}