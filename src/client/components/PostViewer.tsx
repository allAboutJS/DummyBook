import { FaArrowLeft } from "react-icons/fa6";
import PostProps, { AllPostProps } from "../@types/Post";
import PostCard from "./PostCards";

/**
 * Renders a detailed view of a post in a fullscreen modal.
 *
 * This component displays the content of a specific post with a header for navigation.
 * It allows users to go back to the previous view using the back button.
 *
 * @param props - The props include post data and a function to set the current post to view.
 *
 * @returns A fullscreen modal displaying the post details.
 */
function PostViewer(
    props: Omit<AllPostProps | null, "setPostToView"> & {
        setPostToView: PostProps["setPostToView"];
    }
) {
    return (
        <div className="fixed inset-0 bg-zinc-100 dark:bg-black overflow-auto">
            <header className="p-4 flex gap-4 items-center sticky top-0 bg-inherit">
                <button
                    onClick={() => window.history.back()}
                    className="h-10 w-10 flex justify-center items-center dark:hover:bg-zinc-500 rounded-full hover:bg-zinc-300"
                >
                    <FaArrowLeft />
                </button>
                <h1 className="flex-1 text-center text-xl font-bold">Post Viewer</h1>
            </header>
            <div className="max-w-xl m-auto">
                <PostCard {...{ ...(props as AllPostProps), showCommentInPut: true, showReactionOptions: true }} />
            </div>
        </div>
    );
}

export default PostViewer;
