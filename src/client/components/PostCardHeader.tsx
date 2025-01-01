import { Link } from "react-router-dom";
import PostProps from "../@types/Post";
import { FaEllipsisVertical } from "react-icons/fa6";

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

export default PostCardHeader;
