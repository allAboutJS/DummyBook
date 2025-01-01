import LogoProps from "../@types/Logo";

/**
 * Renders a customizable logo component with optional inversion for background and text colors.
 *
 * The `Logo` component provides a circular logo with configurable dimensions, font size,
 * and color inversion. It is commonly used for branding or placeholders within an application.
 *
 * **Props:**
 * - **fontSize** *(string | undefined)*: Sets the font size of the logo's content.
 * - **height** *(string | undefined)*: Defines the height of the logo container.
 * - **width** *(string | undefined)*: Defines the width of the logo container.
 * - **invert** *(boolean | undefined)*: Inverts the logo's color scheme if set to `true`.
 *    - `true`: White background with dark text.
 *    - `false` (default): Dark background with white text.
 *
 * **Behavior:**
 * - Displays a circular container with a bold letter `D` in the center.
 * - Dynamically adjusts size and font based on provided props.
 * - Supports color inversion for different theme contexts.
 *
 * **Styling:**
 * - Default dimensions: `h-12 w-12` (48px x 48px).
 * - Text and background colors change based on the `invert` prop.
 * - Font style: `text-2xl` for prominent display and `font-black` for bold text.
 *
 * @param props - The props for configuring the logo.
 * @returns A styled logo component with dynamic properties.
 */
function Logo({ fontSize, height, invert, width }: LogoProps) {
    return invert ? (
        <div
            style={{
                height,
                width,
                fontSize
            }}
            className="bg-white text-zinc-600 h-12 w-12 rounded-full flex items-center justify-center text-2xl font-black"
        >
            D
        </div>
    ) : (
        <div
            style={{
                height,
                width,
                fontSize
            }}
            className="bg-zinc-600 text-white h-12 w-12 rounded-full flex items-center justify-center text-2xl font-black"
        >
            D
        </div>
    );
}

export default Logo;
