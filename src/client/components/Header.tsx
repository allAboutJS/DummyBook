import { Link } from "react-router-dom";
import Logo from "./Logo";
import { FaBars, FaBell, FaHouse, FaMessage, FaPeopleGroup } from "react-icons/fa6";

/**
 * Renders the main header of the application.
 *
 * This component provides a navigation bar with core functionalities such as search, navigation links,
 * and user profile access. It adapts to different screen sizes with responsive styles and supports
 * dark mode.
 *
 * **Structure:**
 * - **Logo and Search Bar:** Displays the application logo and a search input placeholder.
 * - **Navigation Links:** Provides quick access to Home, Friends, Messages, and Notifications.
 * - **User Profile:** Shows the user's avatar and name on larger screens.
 *
 * **Behavior:**
 * - A menu button (`FaBars`) appears on smaller screens for mobile navigation.
 * - Clicking the logo triggers dark mode by adding the `"dark"` class to the document root.
 *
 * **Accessibility:**
 * - Each navigation link includes an `aria-label` for screen readers.
 *
 * **Styling:**
 * - Sticky positioning keeps the header fixed at the top of the viewport.
 * - Responsive design adjusts layouts and visibility across different screen sizes.
 *
 * @returns A header containing the logo, search input, navigation links, and user profile section.
 */
function Header() {
    return (
        <header className="sticky top-0 dark:bg-zinc-950 bg-white border-b dark:border-zinc-500 md:h-20 flex items-center">
            <div className="max-w-screen-lg m-auto w-full px-4 max-md:px-0 flex gap-4 max-md:gap-0 max-md:flex-col">
                <div
                    onClick={() => document.documentElement.classList.add("dark")}
                    className="flex items-center gap-4 flex-1 md:max-w-xs max-md:border-b max-md:dark:border-zinc-500 max-md:w-full max-md:p-2 max-md:justify-between"
                >
                    <div className="flex gap-4 items-center">
                        <Logo />
                        <Link
                            to={"/app/search"}
                            className="text-sm p-2 rounded-md dark:bg-zinc-500 bg-zinc-200 dark:text-zinc-300 text-zinc-500 md:flex-1"
                        >
                            Search DummyBook...
                        </Link>
                    </div>
                    <button className="md:hidden h-10 w-10 flex justify-center items-center dark:hover:bg-zinc-500 rounded-full">
                        <FaBars />
                    </button>
                </div>
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
                <div className="flex items-center gap-2 max-md:hidden">
                    <img
                        className="w-8 h-8 rounded-full bg-zinc-300"
                        src="https://example.com/avatar1.jpg"
                        alt="User Avatar"
                    />
                    <span className="text-sm">Oliver Gloria</span>
                </div>
            </div>
        </header>
    );
}

export default Header;
