import { Document } from "mongoose";

interface PostDocument extends Document {
    author: {
        id: string;
        fullname: string;
        avatarImageUrl: string;
    };
    datePosted: Date;
    type: "text_only" | "text_and_image";
    impressions: {
        likes: number;
        dislikes: number;
        comments: number;
        shares: number;
    };
    styling: {
        background: string;
        foreground: string;
    };
    data: string | { text?: string; images: string[] };
}

export default PostDocument;
