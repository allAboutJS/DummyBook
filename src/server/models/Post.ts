import PostDocument from "../@types/Post.js";
import mongoose, { connection } from "../config/db.config.js";

const postSchema = new mongoose.Schema<PostDocument>({
    author: {
        type: {
            id: String,
            fullname: String,
            avatarImageUrl: String
        },
        required: true
    },
    datePosted: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        enum: ["text_only", "text_and_image"],
        required: true
    },
    impressions: {
        likes: {
            type: Number,
            default: 0
        },
        dislikes: {
            type: Number,
            default: 0
        },
        comments: {
            type: Number,
            default: 0
        },
        shares: {
            type: Number,
            default: 0
        }
    },
    styling: {
        background: String,
        foreground: String
    },
    data: {
        type: {
            text: {
                type: String,
                required: function () {
                    return this.type === "text_only";
                }
            },
            images: {
                type: [String],
                required: function () {
                    return this.type === "text_and_image";
                }
            }
        }
    }
});

const Post = connection.model("Post", postSchema);

export default Post;
