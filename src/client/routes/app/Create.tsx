import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaImage, FaTrashCan } from "react-icons/fa6";
import { FaUndo } from "react-icons/fa";
import textPostStyles from "../../lib/textPostStyles";
import submitPost from "../../utils/submitPost";
import { useForm } from "react-hook-form";
import { CgSpinner } from "react-icons/cg";

function CreatePost() {
    const [postType, setPostType] = useState<"text_only" | "text_and_image">("text_only");
    const [text, setText] = useState("");
    const [images, setImages] = useState<File[] | null>(null);
    const [postStyling, setPostStyling] = useState<{ foreground: string; background: string } | null>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const {
        handleSubmit,
        formState: { isSubmitting }
    } = useForm();

    const removeImage = (filename: string) => {
        setImages(images?.filter((file) => file.name !== filename) as File[]);
    };

    useEffect(() => {
        if (images && images.length) setPostType("text_and_image");
        else {
            setPostType("text_only");
            imageInputRef.current && (imageInputRef.current.value = "");
        }
    }, [images]);

    return (
        <div className="fixed inset-0 bg-zinc-100 dark:bg-black overflow-auto z-50">
            <header className="p-4 flex gap-4 items-center sticky top-0 bg-inherit">
                <button
                    onClick={() => window.history.back()}
                    className="h-10 w-10 flex justify-center items-center dark:hover:bg-zinc-500 rounded-full hover:bg-zinc-300"
                >
                    <FaArrowLeft />
                </button>
                <h1 className="flex-1 text-center text-xl font-bold">Create Post</h1>
            </header>
            <main className="max-w-xl m-auto p-4 space-y-4">
                <form
                    onSubmit={handleSubmit(async () => await submitPost(text, postType, images, postStyling))}
                    className="dark:bg-zinc-800 bg-white shadow-md rounded-md p-4 space-y-4"
                >
                    <textarea
                        className="w-full bg-zinc-300 dark:bg-zinc-600 outline-none rounded-md p-2 font-semibold min-h-0 h-fit"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Write a post..."
                        autoFocus
                        style={{
                            background: postStyling?.background,
                            color: postStyling?.foreground,
                            textAlign: postStyling ? "center" : undefined,
                            padding: postStyling ? "24px 8px" : undefined
                        }}
                    ></textarea>
                    <div className="flex overflow-auto gap-1">
                        <button
                            onClick={() => (setPostStyling(null), setImages(null))}
                            className="h-12 min-w-12 rounded-md inline-flex bg-zinc-300 dark:bg-zinc-600 items-center justify-center"
                            type="button"
                        >
                            <FaUndo />
                        </button>
                        <button
                            onClick={() => setPostStyling(null)}
                            className="h-12 min-w-12 rounded-md inline-flex bg-zinc-300 dark:bg-zinc-600 items-center justify-center relative"
                            type="button"
                        >
                            <input
                                title=""
                                ref={imageInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                max={5}
                                onChange={(e) => {
                                    const { files } = e.target;
                                    if (files) {
                                        images ? setImages([...images, ...files]) : setImages([...files]);
                                    }
                                }}
                                className="opacity-0 absolute inset-0 appearance-none"
                            />
                            <FaImage />
                        </button>
                        {postType === "text_only" &&
                            Array.from(textPostStyles.entries()).map(([key, { background, foreground }]) => {
                                return (
                                    <button
                                        key={key}
                                        onClick={() => setPostStyling({ background, foreground })}
                                        style={{ background }}
                                        className="h-12 min-w-12 rounded-md inline-block"
                                        type="button"
                                    ></button>
                                );
                            })}
                        {postType === "text_and_image" &&
                            images &&
                            images.map((file, index) => {
                                const imgUrl = URL.createObjectURL(file);

                                return (
                                    <button
                                        key={index}
                                        onClick={() => (URL.revokeObjectURL(imgUrl), removeImage(file.name))}
                                        className="h-12 min-w-12 rounded-md inline-block overflow-hidden relative"
                                        type="button"
                                    >
                                        <img src={imgUrl} alt="Post image" className="h-full w-full object-cover" />
                                        <span className="absolute inset-0 flex items-center justify-center">
                                            <FaTrashCan />
                                        </span>
                                    </button>
                                );
                            })}
                    </div>

                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="bg-zinc-800 h-10 flex items-center justify-center rounded-md p-2 text-white w-full hover:bg-zinc-700 dark:bg-white dark:text-zinc-800 dark:hover:bg-zinc-100 font-semibold text-sm"
                    >
                        {isSubmitting ? <CgSpinner className="animate-spin" /> : "Post"}
                    </button>
                </form>
            </main>
        </div>
    );
}

export default CreatePost;
