/**
 * Renders a collage of images based on the number of images provided.
 * The layout changes dynamically depending on the number of images (1, 2, 3, or more).
 *
 * @param props - The properties for the ImageCollage component.
 * @param props.images - An array of image URLs to be displayed in the collage.
 * @param props.openImageViewer - A function to open the image viewer with a specific image index.
 * @returns A React element representing the image collage with clickable images.
 */
function ImageCollage({ images, openImageViewer }: { images: string[]; openImageViewer(index: number): void }) {
    switch (images.length) {
        case 1:
            return (
                <img
                    onClick={() => openImageViewer(0)}
                    className="object-cover w-full h-full"
                    src={images[0]}
                    alt="Post illustration"
                />
            );
        case 2:
            return (
                <div className="grid grid-cols-2">
                    <img
                        onClick={() => openImageViewer(0)}
                        className="object-cover w-full h-full"
                        src={images[0]}
                        alt="Post illustration"
                    />
                    <img
                        onClick={() => openImageViewer(1)}
                        className="object-cover w-full h-full"
                        src={images[1]}
                        alt="Post illustration"
                    />
                </div>
            );
        case 3:
            return (
                <div className="grid grid-cols-2">
                    <img
                        onClick={() => openImageViewer(0)}
                        className="object-cover w-full h-full"
                        src={images[0]}
                        alt="Post illustration"
                    />
                    <div className="grid grid-rows-2">
                        <img
                            onClick={() => openImageViewer(1)}
                            className="object-cover w-full h-full"
                            src={images[1]}
                            alt="Post illustration"
                        />
                        <img
                            onClick={() => openImageViewer(2)}
                            className="object-cover w-full h-full"
                            src={images[2]}
                            alt="Post illustration"
                        />
                    </div>
                </div>
            );
        default:
            // More than 3 images
            return (
                <div className="grid grid-cols-2">
                    <img
                        onClick={() => openImageViewer(0)}
                        className="object-cover w-full h-full"
                        src={images[0]}
                        alt="Post illustration"
                    />
                    <div className="grid grid-rows-2">
                        <img
                            onClick={() => openImageViewer(1)}
                            className="object-cover w-full h-full"
                            src={images[1]}
                            alt="Post illustration"
                        />
                        <div onClick={() => openImageViewer(2)} className="relative text-zinc-50">
                            <img className="object-cover w-full h-full" src={images[2]} alt="Post illustration" />
                            <div className="absolute inset-0 bg-black/50 text-2xl font-bold flex items-center justify-center">
                                +{images.length - 3}
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
}

export default ImageCollage;
