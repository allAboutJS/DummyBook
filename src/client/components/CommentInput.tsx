/**
 * Renders a comment input form component.
 * This component provides a text input field for users to write comments
 * and a submit button to post the comment.
 *
 * @returns A form element containing an input field and a submit button.
 */
function CommentInput() {
    return (
        <form className="p-2 flex text-sm gap-2">
            <input
                className="p-2 rounded-md dark:bg-zinc-600 bg-zinc-200 w-full outline-none"
                type="text"
                autoFocus
                placeholder="Write a comment..."
            />
            <button className="py-2 px-4 rounded-md dark:bg-zinc-600 dark:hover:bg-zinc-700 bg-zinc-300 hover:bg-zinc-200 font-semibold">
                Post
            </button>
        </form>
    );
}

export default CommentInput;
