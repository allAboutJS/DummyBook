import { FaArrowLeft } from "react-icons/fa6";
import { useState } from "react";
import PostImageViewerProps from "../@types/PostImageViewer";

/**
 * Renders an image viewer component for browsing a collection of images with navigation controls.
 *
 * @param props - The properties for the image viewer.
 * @param props.currentImageIndex - The index of the currently displayed image.
 * @param props.imagesToView - An array of image URLs available for viewing.
 * @returns A React component that displays an image viewer with navigation controls and thumbnails.
 */
function PostImageViewer(props: PostImageViewerProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(props.currentImageIndex);

    return (
        <div className="fixed inset-0 bg-zinc-100/50 dark:bg-black/50 backdrop-blur-md overflow-auto flex flex-col">
            <header className="p-4 flex gap-4 items-center sticky top-0 dark:bg-zinc-800 bg-white">
                <button
                    onClick={() => window.history.back()}
                    className="h-10 w-10 flex justify-center items-center dark:hover:bg-zinc-500 rounded-full hover:bg-zinc-300"
                >
                    <FaArrowLeft />
                </button>
                <h1 className="flex-1 text-center text-xl font-bold">Image Viewer</h1>
            </header>
            <div className="max-w-xl m-auto flex-1 flex items-center justify-center">
                <img
                    className="w-full h-auto"
                    src={props.imagesToView[currentImageIndex]}
                    alt={props.imagesToView[currentImageIndex]}
                />
            </div>
            <footer className="sticky bottom-0 dark:bg-zinc-800 bg-white h-18 p-2 overflow-auto flex justify-center min-w-full">
                <div className="flex gap-2 m-auto pr-4">
                    {props.imagesToView.map((imgUrl, index) => (
                        <img
                            onClick={() => setCurrentImageIndex(index)}
                            className={`h-16 w-auto ${
                                currentImageIndex === index &&
                                "dark:outline-zinc-100 outline-zinc-700 outline outline-offset-2"
                            }`}
                            src={imgUrl}
                            alt={imgUrl}
                            key={index}
                        />
                    ))}
                </div>
            </footer>
        </div>
    );
}

export default PostImageViewer;
