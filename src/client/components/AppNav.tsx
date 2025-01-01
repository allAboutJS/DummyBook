import { FaBell, FaHouse, FaMessage, FaPeopleGroup } from "react-icons/fa6";
import { Link } from "react-router-dom";

/**
 * A functional component that renders the app's navigation menu with links to different sections of the application.
 *
 * @returns A JSX element containing the menu with links to Home, Friends, Messages, and Notifications.
 */
function AppNav() {
    return (
        <div className="flex items-center justify-around md:max-w-sm md:m-auto flex-1 max-md:p-2">
            <Link
                className="p-2 rounded-md dark:hover:bg-zinc-600 hover:bg-zinc-200 flex flex-col items-center justify-center"
                to={"/app"}
                aria-label="Your feed"
            >
                <FaHouse />
                <span className="text-xs dark:text-zinc-300">Home</span>
            </Link>
            <Link
                className="p-2 rounded-md dark:hover:bg-zinc-600 hover:bg-zinc-200 flex flex-col items-center justify-center"
                to={"/app/friends"}
                aria-label="Your friends"
            >
                <FaPeopleGroup />
                <span className="text-xs dark:text-zinc-300">Friends</span>
            </Link>
            <Link
                className="p-2 rounded-md dark:hover:bg-zinc-600 hover:bg-zinc-200 flex flex-col items-center justify-center"
                to={"/app/messages"}
                aria-label="Your messages"
            >
                <FaMessage />
                <span className="text-xs dark:text-zinc-300">Messages</span>
            </Link>
            <Link
                className="p-2 rounded-md dark:hover:bg-zinc-600 hover:bg-zinc-200 flex flex-col items-center justify-center"
                to={"/app/messages"}
                aria-label="Your messages"
            >
                <FaBell />
                <span className="text-xs dark:text-zinc-300">Notifications</span>
            </Link>
        </div>
    );
}

export default AppNav;
