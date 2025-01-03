import { Link } from "react-router-dom";
import Logo from "./Logo";
import { FaBars } from "react-icons/fa6";
import AppNav from "./AppNav";
import { useSelector } from "react-redux";

/**
 * Renders the main header component for the application, including navigation links, search, and user profile.
 *
 * @returns A React component representing the application's header with navigation and interactive elements.
 */
function Header() {
    const user = useSelector((state: any) => state.auth.user);

    return (
        <header className="sticky top-0 dark:bg-zinc-950 bg-white border-b dark:border-zinc-500 md:h-20 flex items-center z-50">
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
                <AppNav />
                <Link to={"/app/me"} className="flex items-center gap-2 max-md:hidden">
                    <img className="w-8 h-8 rounded-full bg-zinc-300" src={user.avatarImageUrl} alt="User Avatar" />
                    <span className="text-sm">{user.fullname}</span>
                </Link>
            </div>
        </header>
    );
}

export default Header;
