import { Document } from "mongoose";

export interface UserDocument extends Document {
    fullname: string;
    email: string;
    password: string;
    avatarImageUrl?: string;
    coverImageUrl?: string;
    gender: "Male" | "Female";
}

export default UserDocument;
