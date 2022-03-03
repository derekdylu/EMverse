// Set mongo connection
import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";

export default function connectDB()
{
    dotenv.config();

    mongoose
    .connect(
        process.env.MONGO_URL, {
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        }
    )
    .then((res) => console.log("mongo db connected."))
    .catch((err) => console.log("mongo db failed to connect: " + err))
}