import { AllPostProps, PostContext } from "../@types/Post";
import { createContext, useState } from "react";
import PostCardHeader from "./PostCardHeader";
import PostCardFooter from "./PostCardFooter";
import CommentInput from "./CommentInput";
import PostText from "./PostText";
import PostImage from "./PostImage";

/**
 * Creates a React context for managing post-related data and state.
 *
 * @constant PostCtx - The context for sharing post data across components.
 * @default null (cast as unknown to match the expected type)
 */
export const PostCtx = createContext<PostContext>(null as unknown as PostContext);

/**
 * Renders a post card component, which can display either a text post or an image post,
 * along with a header and footer for user interactions.
 *
 * @param props - The properties of the post card, which include:
 * @param props.author - The author details of the post.
 * @param props.impressions - The interaction counts for the post (likes, dislikes, comments, shares).
 * @param props.type - The type of post, which determines the content to display (text or image).
 * @param props.data - The content data of the post, which varies based on the post type.
 * @param props.styling - Optional styling for text posts with background and foreground colors.
 * @param props.id - The unique identifier of the post.
 * @returns A React component representing the complete post card with header, content, and footer.
 */
function PostCard(props: AllPostProps) {
    const [isCommentInputVisible, setCommentInputVisibility] = useState<boolean>(props.showCommentInPut || false);
    const { setImageToViewIndex, setImagesToView } = props;

    return (
        <div className="bg-white shadow-sm rounded-md max-[526px]:rounded-none dark:bg-zinc-800 ">
            <PostCardHeader {...props.author} />
            <PostCtx.Provider
                value={{ postToView: props, setCommentInputVisibility, setImageToViewIndex, setImagesToView }}
            >
                {props.type !== "text_only" ? (
                    <PostImage setPostToView={props.setPostToView} {...props.data} />
                ) : (
                    <PostText
                        setPostToView={props.setPostToView}
                        id={props.id}
                        data={props.data}
                        styling={props.styling}
                    />
                )}
                <PostCardFooter {...props.impressions} />
                {isCommentInputVisible && <CommentInput />}
            </PostCtx.Provider>
        </div>
    );
}

export default PostCard;
