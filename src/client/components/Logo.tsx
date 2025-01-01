import LogoProps from "../@types/Logo";

/**
 * Renders a logo component with customizable size, color, and inversion properties.
 *
 * @param props - The properties for the logo component.
 * @param props.fontSize - The font size of the logo text.
 * @param props.height - The height of the logo container.
 * @param props.width - The width of the logo container.
 * @param props.invert - A boolean indicating whether to invert the logo colors.
 * @returns A React component representing a stylized logo with adjustable properties.
 *
 * @description
 * - When `invert` is true, the logo has a white background with dark text.
 * - When `invert` is false, the logo has a dark background with white text.
 */
function Logo({ fontSize, height, invert, width }: LogoProps) {
    return invert ? (
        <div
            style={{ height, width, fontSize }}
            className="bg-white text-zinc-600 h-12 w-12 rounded-full flex items-center justify-center text-2xl font-black"
        >
            D
        </div>
    ) : (
        <div
            style={{ height, width, fontSize }}
            className="bg-zinc-600 text-white h-12 w-12 rounded-full flex items-center justify-center text-2xl font-black"
        >
            D
        </div>
    );
}

export default Logo;
