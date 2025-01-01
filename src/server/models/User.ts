import { Document } from "mongoose";
import mongoose, { connection } from "../config/db.config.js";

export interface UserDocument extends Document {
    fullname: string;
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema<UserDocument>({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = connection.model<UserDocument>("User", userSchema);

export default User;
