import mongoose, { connection } from "../config/db.config.js";
import UserDocument from "../@types/User.js";

const userSchema = new mongoose.Schema<UserDocument>({
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true,
        validate: {
            validator: (value: string) => /^[\w'\-]+\s*([\w'\-]+)*$/.test(value)
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
        validate: {
            validator: (value: string) => /^([a-zA-Z0-9.\-]{3,}@[a-zA-Z0-9]{2,}).[a-zA-Z0-9]{2,}$/.test(value)
        }
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true
    },
    avatarImageUrl: {
        type: String,
        default: "/images/default-user.png"
    },
    coverImageUrl: {
        type: String,
        default: "/images/default-cover-image.jpg"
    }
});

const User = connection.model<UserDocument>("User", userSchema);

export default User;
