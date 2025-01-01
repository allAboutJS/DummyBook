import { Link } from "react-router-dom";
import PostProps, { AllPostProps, ImagePostProps } from "../../@types/Post";
import PostCard from "../../components/PostCards";
import { FaBookmark, FaMessage, FaPeopleGroup } from "react-icons/fa6";
import PostViewer from "../../components/PostViewer";
import { useCallback, useEffect, useState } from "react";
import PostImageViewer from "../../components/PostImageViewer";

const posts = [
    {
        id: "1",
        author: {
            id: "a1",
            fullname: "Alice Johnson",
            avatarUrl: "https://example.com/avatar1.jpg",
            dateJoined: new Date("2022-01-15")
        },
        datePosted: "2024-06-01",
        type: "text_only",
        impressions: {
            likes: 150,
            dislikes: 5,
            comments: 20,
            shares: 10
        },
        data: "Just finished reading an amazing book on JavaScript patterns. Highly recommend it!"
    },
    {
        id: "2",
        author: {
            id: "a2",
            fullname: "Bob Smith",
            avatarUrl: "https://example.com/avatar2.jpg",
            dateJoined: new Date("2021-11-05")
        },
        datePosted: "2024-06-02",
        type: "text_only",
        impressions: {
            likes: 90,
            dislikes: 2,
            comments: 15,
            shares: 5
        },
        data: "Learning TypeScript has been such a game changer for my projects!",
        styling: {
            background: "#1e3a8a",
            foreground: "#ffffff"
        }
    },
    {
        id: "3",
        author: {
            id: "a3",
            fullname: "Charlie Doe",
            avatarUrl: "https://example.com/avatar3.jpg",
            dateJoined: new Date("2020-07-20")
        },
        datePosted: "2024-06-03",
        type: "text_only",
        impressions: {
            likes: 200,
            dislikes: 8,
            comments: 25,
            shares: 12
        },
        data: "Debugging is like being the detective in a crime movie where you are also the murderer."
    },
    {
        id: "4",
        author: {
            id: "a4",
            fullname: "Diana Prince",
            avatarUrl: "https://example.com/avatar4.jpg",
            dateJoined: new Date("2023-03-10")
        },
        datePosted: "2024-06-04",
        type: "text_only",
        impressions: {
            likes: 175,
            dislikes: 4,
            comments: 18,
            shares: 9
        },
        data: "Refactoring old code is oddly satisfying.",
        styling: {
            background: "#065f46",
            foreground: "#ffffff"
        }
    },
    {
        id: "5",
        author: {
            id: "a5",
            fullname: "Ethan Hunt",
            avatarUrl: "https://example.com/avatar5.jpg",
            dateJoined: new Date("2022-09-30")
        },
        datePosted: "2024-06-05",
        type: "text_only",
        impressions: {
            likes: 120,
            dislikes: 3,
            comments: 14,
            shares: 7
        },
        data: "Today's goal: Fix one bug, break nothing else."
    },
    {
        id: "6",
        author: {
            id: "a6",
            fullname: "Fiona Clark",
            avatarUrl: "https://example.com/avatar6.jpg",
            dateJoined: new Date("2021-05-25")
        },
        datePosted: "2024-06-06",
        type: "text_only",
        impressions: {
            likes: 85,
            dislikes: 1,
            comments: 10,
            shares: 4
        },
        data: "Sometimes, the best debugger is a cup of coffee.",
        styling: {
            background: "#7c3aed",
            foreground: "#ffffff"
        }
    },
    {
        id: "7",
        author: {
            id: "a7",
            fullname: "George Lane",
            avatarUrl: "https://example.com/avatar7.jpg",
            dateJoined: new Date("2020-12-12")
        },
        datePosted: "2024-06-07",
        type: "text_only",
        impressions: {
            likes: 140,
            dislikes: 6,
            comments: 17,
            shares: 8
        },
        data: "If it works, don't touch it. If it breaks, blame the intern."
    },
    {
        id: "8",
        author: {
            id: "a8",
            fullname: "Hannah White",
            avatarUrl: "https://example.com/avatar8.jpg",
            dateJoined: new Date("2023-08-18")
        },
        datePosted: "2024-06-08",
        type: "text_only",
        impressions: {
            likes: 95,
            dislikes: 2,
            comments: 12,
            shares: 6
        },
        data: "Pair programming: Two brains, one keyboard, endless arguments.",
        styling: {
            background: "#2563eb",
            foreground: "#ffffff"
        }
    },
    {
        id: "9",
        author: {
            id: "a8",
            fullname: "Hannah White",
            avatarUrl: "https://example.com/avatar8.jpg",
            dateJoined: new Date("2023-08-18")
        },
        datePosted: "2024-06-08",
        type: "text_and_image",
        impressions: {
            likes: 95,
            dislikes: 2,
            comments: 12,
            shares: 6
        },
        data: {
            text: "Pair programming: Two brains, one keyboard, endless arguments.",
            images: [
                "/img-3.webp",
                "/img-2.jpg",
                "/img-3.webp",
                "/img-2.jpg",
                "/img-3.webp",
                "/img-2.jpg",
                "/img-3.webp",
                "/img-2.jpg",
                "/img-3.webp",
                "/img-3.webp"
            ]
        }
    }
];

/**
 * Renders the main feed view, displaying a list of posts, navigation links, and a modal for viewing individual posts.
 *
 * The component manages the state for viewing a specific post and handles browser navigation events
 * to close the post viewer when the user navigates back.
 *
 * **State Management:**
 * - `postToView`: Tracks the currently selected post for detailed viewing.
 *
 * **Event Handling:**
 * - Listens to the `popstate` event to close the post viewer when the browser's back button is pressed.
 *
 * **Layout Structure:**
 * - **Aside:** Provides navigation links for the user profile, messages, bookmarks, and friends.
 * - **Main:** Displays a list of posts and an input box for creating a new post.
 * - **Post Viewer Modal:** Opens when a specific post is selected.
 *
 * **Effects:**
 * - Attaches and removes the `popstate` event listener during component mount and unmount.
 *
 * @returns The feed interface with navigation, post list, and modal for detailed post viewing.
 */
function Feed() {
    const [postToView, setPostToView] = useState<AllPostProps | null>(null);
    const [imagesToView, setImagesToView] = useState<string[] | null>(null);
    const [imageToViewIndex, setImageToViewIndex] = useState<number>(0);
    const closeViewersOnPopstate = useCallback(
        (e: HashChangeEvent) => {
            const hash = window.location.hash;

            if (imagesToView && hash !== "#openImageViewer") setImagesToView(null), setImageToViewIndex(0);
            else if (postToView && hash !== "#openPostViewer") setPostToView(null);
        },
        [postToView, imagesToView]
    );

    useEffect(() => {
        window.addEventListener("hashchange", closeViewersOnPopstate);

        return () => {
            window.removeEventListener("hashchange", closeViewersOnPopstate);
        };
    }, [closeViewersOnPopstate]);

    return (
        <div className="bg-zinc-100 p-4 max-lg:p-0 dark:bg-black ">
            <div className="flex max-w-[960px] m-auto gap-4">
                {/* Aside */}
                <aside className="bg-white shadow-sm flex-1 max-w-sm h-fit rounded-md p-4 sticky top-24 max-lg:hidden dark:bg-zinc-800">
                    <div className="font-semibold">
                        <Link to={"/app/me"} className="flex items-center gap-2">
                            <img
                                className="w-8 h-8 rounded-full bg-zinc-300"
                                src="https://example.com/avatar1.jpg"
                                alt="User Avatar"
                            />{" "}
                            Oliver Gloria
                        </Link>
                        <br />
                        <Link
                            to={"/app/messages"}
                            className="flex items-center gap-2 hover:bg-zinc-200 p-2 rounded dark:hover:bg-zinc-700"
                        >
                            <FaMessage /> Messages
                        </Link>
                        <Link
                            to={"/app/bookmarks"}
                            className="flex items-center gap-2 hover:bg-zinc-200 p-2 rounded dark:hover:bg-zinc-700"
                        >
                            <FaBookmark /> Bookmarks
                        </Link>
                        <Link
                            to={"/app/friends"}
                            className="flex items-center gap-2 hover:bg-zinc-200 p-2 rounded dark:hover:bg-zinc-700"
                        >
                            <FaPeopleGroup /> Friends
                        </Link>
                    </div>
                </aside>
                {/* Aside */}

                {/* Main */}
                <main className="space-y-3 flex-1 max-w-lg m-auto">
                    <div className="flex items-center gap-2 bg-white p-4 rounded-md shadow-sm dark:bg-zinc-800 max-lg:rounded-t-none max-[526px]:rounded-none">
                        <img
                            className="w-8 h-8 rounded-full bg-zinc-300"
                            src="https://example.com/avatar1.jpg"
                            alt="User Avatar"
                        />{" "}
                        <Link
                            to={"/app/create"}
                            className="p-2 rounded bg-zinc-200 flex-1 text-sm text-zinc-500 dark:bg-zinc-500 dark:text-zinc-300"
                        >
                            What's on your mind?
                        </Link>
                    </div>
                    {posts.map((post) => (
                        <PostCard
                            key={post.id}
                            {...(post as AllPostProps)}
                            setImageToViewIndex={setImageToViewIndex}
                            setImagesToView={setImagesToView}
                            setPostToView={setPostToView}
                        />
                    ))}
                </main>
                {/* Main */}
            </div>
            {postToView && (
                <PostViewer setPostToView={setPostToView} {...(postToView as Omit<PostProps, "setPostToView">)} />
            )}
            {imagesToView && <PostImageViewer currentImageIndex={imageToViewIndex} imagesToView={imagesToView} />}
        </div>
    );
}

export default Feed;
