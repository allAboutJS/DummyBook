import PostProps, { AllPostProps } from "../@types/Post";

/**
 * Opens the post viewer by setting the current post to view and updating the URL hash.
 *
 * @param postToView - The post object to be viewed, or null if no post is selected.
 * @param setPostToView - A function to set the current post to view.
 */
const openPostViewer = async (postToView: AllPostProps | null, setPostToView: PostProps["setPostToView"]) => {
    setPostToView(postToView);
    window.location.hash = "openPostViewer";
};

export default openPostViewer;
