import { useContext } from "react";
import PostProps, { TextWithBackgroundPostProps } from "../@types/Post";
import { PostCtx } from "./PostCards";
import openPostViewer from "../utils/openPostViewer";

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
function PostText(
    props: Pick<TextWithBackgroundPostProps, "data" | "styling" | "id"> & {
        setPostToView: PostProps["setPostToView"];
    }
) {
    const { postToView } = useContext(PostCtx);

    return props.styling?.foreground && props.styling?.background ? (
        <p
            onClick={() => openPostViewer(postToView, props.setPostToView)}
            style={{ backgroundColor: props.styling?.background, color: props.styling?.foreground }}
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

export default PostText;
