import mongoose from "mongoose";
import { config } from "dotenv";

export const connection = mongoose.connection.useDb("DummyBook");

export const connectToDb = async () => {
    try {
        config();
        await mongoose.connect(process.env.DB_URL as string);
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    }
};

export default mongoose;
