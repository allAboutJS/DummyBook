import { useContext } from "react";
import { PostCtx } from "./PostCards";
import PostProps from "../@types/Post";
import { FaComment, FaShare, FaThumbsDown, FaThumbsUp } from "react-icons/fa6";

/**
 * Renders the footer section of a post card, displaying interaction buttons and counts.
 *
 * @param props - The impression properties of the post.
 * @param props.likes - The number of likes for the post.
 * @param props.dislikes - The number of dislikes for the post.
 * @param props.comments - The number of comments on the post.
 * @param props.shares - The number of times the post has been shared.
 * @returns A React component representing the post card footer with interaction buttons and counts.
 */
function PostCardFooter(props: PostProps["impressions"]) {
    const { setCommentInputVisibility } = useContext(PostCtx);

    return (
        <div className="text-sm grid grid-cols-3 px-4 py-2">
            <div className="flex items-center gap-1">
                <button className="p-2 rounded-md dark:hover:bg-zinc-600 hover:bg-zinc-200 flex items-center gap-1">
                    <FaThumbsUp /> {props.likes}
                </button>
                <button className="p-2 rounded-md dark:hover:bg-zinc-600 hover:bg-zinc-200 flex items-center gap-1">
                    <FaThumbsDown /> {props.dislikes}
                </button>
            </div>
            <button
                onClick={() => setCommentInputVisibility(true)}
                className="p-2 rounded-md dark:hover:bg-zinc-600 hover:bg-zinc-200 flex items-center gap-1 justify-center"
            >
                <FaComment /> {props.comments}
            </button>
            <div className="flex justify-end">
                <button className="p-2 rounded-md dark:hover:bg-zinc-600 hover:bg-zinc-200 flex items-center gap-1">
                    <FaShare /> {props.shares}
                </button>
            </div>
        </div>
    );
}

export default PostCardFooter;
