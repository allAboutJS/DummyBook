import { Link } from "react-router-dom";
import PostProps, { AllPostProps, ImagePostProps, PostContext, TextWithBackgroundPostProps } from "../@types/Post";
import { FaComment, FaEllipsisVertical, FaShare, FaThumbsDown, FaThumbsUp } from "react-icons/fa6";
import { createContext, useContext, useState } from "react";

/**
 * Context for managing post-related data and state across the application.
 *
 * This context provides access to post-related information and functionalities, allowing components
 * to share and consume post data without prop drilling.
 *
 * **Default Value:**
 * - Initialized with a `null` value cast as `any` to satisfy TypeScript type requirements.
 *
 * **Intended Use:**
 * - Should be used with a `PostCtx.Provider` to supply a valid context value.
 * - Consumers can access post-related data and methods via `useContext(PostCtx)`.
 */
const PostCtx = createContext<PostContext>(null as unknown as any);

/**
 * Opens the post viewer by setting the current post to view and updating the URL hash.
 *
 * @param postToView - The post object to be viewed, or null if no post is selected.
 * @param setPostToView - A function to set the current post to view.
 */
const openPostViewer = (postToView: AllPostProps | null, setPostToView: PostProps["setPostToView"]) => {
    setPostToView(postToView);
    window.location.hash = postToView?.id || "";
};

/**
 * Renders the header section of a post card.
 *
 * @param props - The author properties of the post.
 * @param props.avatarUrl - The URL of the author's avatar image.
 * @param props.fullname - The full name of the author.
 * @param props.id - The unique identifier of the author.
 * @param props.dateJoined - The date when the author joined the platform.
 * @returns A React component representing the post card header.
 */
function PostCardHeader(props: PostProps["author"]) {
    return (
        <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
                <img className="h-10 w-10 rounded-full bg-zinc-300" src={props.avatarUrl} alt={props.fullname} />
                <div>
                    <Link to={`/app/user/${props.id}`} className="text-base font-semibold hover:underline">
                        {props.fullname}
                    </Link>
                    <p className="text-sm text-zinc-400">Joined {props.dateJoined.toDateString()}</p>
                </div>
            </div>
            <div className="flex gap-2">
                <button className="dark:bg-zinc-600 bg-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-xs font-semibold py-1 px-2 rounded-md">
                    Add friend
                </button>
                <button className="h-8 w-8 rounded-full dark:hover:bg-zinc-600 hover:bg-zinc-200 flex items-center justify-center">
                    <FaEllipsisVertical />
                </button>
            </div>
        </div>
    );
}

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

/**
 * Renders an input form for adding a comment.
 *
 * This component provides a text input field and a submission button, enabling users to write and post comments.
 *
 * **Behavior:**
 * - The text input is automatically focused when the component mounts (`autoFocus`).
 * - The input field allows users to type comments with an outlined style for better focus visibility.
 * - The submit button is styled with hover effects for better user interaction.
 *
 * **Structure:**
 * - **Input Field:** A single-line text input for entering a comment.
 * - **Button:** Triggers the submission of the comment.
 *
 * **Styling:**
 * - Applies responsive and theme-aware (`dark` mode) styles for both the input field and button.
 *
 * @returns A form with a text input and a submit button for posting comments.
 */
function CommentInput() {
    return (
        <form className="p-2 flex text-sm gap-2">
            <input
                className="p-2 rounded-md dark:bg-zinc-600 bg-zinc-200 w-full outline-none"
                type="text"
                autoFocus
                placeholder="Write a comment..."
            />
            <button className="py-2 px-4 rounded-md dark:bg-zinc-600 dark:hover:bg-zinc-700 bg-zinc-300 hover:bg-zinc-200 font-semibold">
                Post
            </button>
        </form>
    );
}

/**
 * Renders a text-based post card with customizable styling and click behavior.
 *
 * @component
 * @param props - The props object.
 * @param props.data - The data content of the post.
 * @param props.styling - Styling properties for the post.
 * @param props.styling.foreground - Text color for the post.
 * @param props.styling.background - Background color for the post.
 * @param props.id - Unique identifier for the post.
 * @param props.setPostToView - Function to set the current post to view.
 * @returns A styled paragraph element representing the text post card.
 */
function TextPostCard(
    props: Pick<TextWithBackgroundPostProps, "data" | "styling" | "id"> & {
        setPostToView: PostProps["setPostToView"];
    }
) {
    const { postToView } = useContext(PostCtx);

    return props.styling?.foreground && props.styling?.background ? (
        <p
            onClick={() => openPostViewer(postToView, props.setPostToView)}
            style={{
                backgroundColor: props.styling.background,
                color: props.styling.foreground
            }}
            className="py-6 px-4 text-lg font-semibold text-center min-h-40 flex justify-center items-center cursor-pointer"
        >
            {props.data}
        </p>
    ) : (
        <p onClick={() => openPostViewer(postToView, props.setPostToView)} className="p-4 font-semibold cursor-pointer">
            {props.data}
        </p>
    );
}

/**
 * Renders an image post card, displaying text and a grid of images based on the number of images provided.
 *
 * @param props - The properties of the image post.
 * @param props.text - Optional text content to display above the images.
 * @param props.images - An array of image URLs to display in the post. The layout changes based on the number of images.
 * @returns A React component representing the image post card with text and images.
 */
function ImagePostCard(props: ImagePostProps["data"] & { setPostToView: PostProps["setPostToView"] }) {
    const { text, images, setPostToView } = props;
    const { postToView } = useContext(PostCtx);

    return (
        <div>
            {text && (
                <p onClick={() => openPostViewer(postToView, setPostToView)} className="px-4 py-2 pt-4 cursor-pointer">
                    {text}
                </p>
            )}
            <div className="min-h-fit overflow-hidden">
                {images.length === 1 ? (
                    <img className="object-cover w-full h-full" src={images[0]} alt="Post illustration" />
                ) : images.length === 2 ? (
                    <div className="grid grid-cols-2">
                        <img className="object-cover w-full h-full" src={images[0]} alt="Post illustration" />
                        <img className="object-cover w-full h-full" src={images[1]} alt="Post illustration" />
                    </div>
                ) : images.length === 3 ? (
                    <div className="grid grid-cols-2">
                        <img className="object-cover w-full h-full" src={images[0]} alt="Post illustration" />
                        <div className="grid grid-rows-2">
                            <img className="object-cover w-full h-full" src={images[1]} alt="Post illustration" />
                            <img className="object-cover w-full h-full" src={images[2]} alt="Post illustration" />
                        </div>
                    </div>
                ) : (
                    // More than 3 images, display a thumbnail grid
                    <div className="grid grid-cols-2">
                        <img className="object-cover w-full h-full" src={images[0]} alt="Post illustration" />
                        <div className="grid grid-rows-2">
                            <img className="object-cover w-full h-full" src={images[1]} alt="Post illustration" />
                            <div className="relative">
                                <img className="object-cover w-full h-full" src={images[2]} alt="Post illustration" />
                                <div className="absolute inset-0 bg-black/50 text-2xl font-bold flex items-center justify-center">
                                    +{images.length - 3}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

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

    return (
        <div className="bg-white shadow-sm rounded-md max-[526px]:rounded-none dark:bg-zinc-800 ">
            <PostCardHeader {...props.author} />
            <PostCtx.Provider value={{ postToView: props, setCommentInputVisibility }}>
                {props.type !== "text_only" ? (
                    <ImagePostCard setPostToView={props.setPostToView} {...props.data} />
                ) : (
                    <TextPostCard
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
