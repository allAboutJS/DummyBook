import { useContext } from "react";
import PostProps, { ImagePostProps } from "../@types/Post";
import { PostCtx } from "./PostCards";
import openPostViewer from "../utils/openPostViewer";
import ImageCollage from "./ImageCollage";

/**
 * Renders an image post card, displaying text and a grid of images based on the number of images provided.
 *
 * @param props - The properties of the image post.
 * @param props.text - Optional text content to display above the images.
 * @param props.images - An array of image URLs to display in the post. The layout changes based on the number of images.
 * @returns A React component representing the image post card with text and images.
 */
function PostImage(props: ImagePostProps["data"] & { setPostToView: PostProps["setPostToView"] }) {
    const { text, images, setPostToView } = props;
    const { postToView, setImageToViewIndex, setImagesToView } = useContext(PostCtx);

    /** Opens the image viewer modal. */
    const openImageViewer = (index: number) => {
        document.location.hash = "openImageViewer";
        setImageToViewIndex(index);
        setImagesToView(images);
    };

    return (
        <div>
            {text && (
                <p onClick={() => openPostViewer(postToView, setPostToView)} className="px-4 py-2 pt-4 cursor-pointer">
                    {text}
                </p>
            )}
            <div className="min-h-fit overflow-hidden">
                <ImageCollage images={images} openImageViewer={openImageViewer} />
            </div>
        </div>
    );
}

export default PostImage;
