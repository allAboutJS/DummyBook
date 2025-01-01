import { useRef } from "react";
import InputProps from "../@types/Input";

/**
 * Renders a customizable input field with optional validation, labeling, and error messaging.
 *
 * @param props - The properties for the input component.
 * @param props.name - The name of the input field.
 * @param props.label - The label text displayed alongside the input field.
 * @param props.placeholder - The placeholder text displayed inside the input field.
 * @param props.disabled - A boolean indicating whether the input is disabled.
 * @param props.required - A boolean indicating whether the input is required.
 * @param props.customPattern - A custom regex pattern for input validation.
 * @param props.errorMessages - An object containing custom error messages.
 * @param props.errorMessages.empty - Message displayed when the input is empty but required.
 * @param props.errorMessages.invalid - Message displayed when the input doesn't match the pattern.
 * @param props.errors - Validation errors object, usually from a form library.
 * @param props.register - A function for registering the input with a React Hook Form.
 * @param props.id - The unique identifier for the input field.
 * @returns A React component representing an enhanced input field with validation, error handling, and dynamic labeling.
 *
 * @description
 * `Input` is a flexible input component designed for use in forms. It supports:
 * - Dynamic validation with regex patterns.
 * - Integration with React Hook Form via `register`.
 * - Custom error messages for validation feedback.
 * - A floating label design that animates based on focus and value state.
 * - Clear error messages displayed below the input field.
 */
function Input(props: InputProps) {
    const labelRef = useRef<HTMLLabelElement>(null);

    return (
        <div className="relative">
            {props.register ? (
                <input
                    className="border-b outline-none min-w-0 w-full py-2 text-sm border-zinc-400 focus:border-zinc-600 peer"
                    {...props.register(props.name, {
                        disabled: props.disabled,
                        required: {
                            value: props.required || false,
                            message: props.errorMessages?.empty || "This field is required"
                        },
                        pattern: {
                            value: RegExp(props["custom-pattern"] || /.*/),
                            message: props.errorMessages?.invalid || "Please enter a valid value"
                        }
                    })}
                    {...{ ...props, register: undefined }}
                    placeholder={props.label ? undefined : props.placeholder}
                    autoCorrect="off"
                />
            ) : (
                <input
                    className="border-b outline-none min-w-0 w-full py-2 text-sm border-zinc-400 focus:border-zinc-600 peer"
                    {...{ ...props, register: undefined }}
                    placeholder={props.label ? undefined : props.placeholder}
                    autoCorrect="off"
                />
            )}
            {props.label && (
                <label
                    ref={labelRef}
                    onClick={() => (labelRef.current?.previousElementSibling as HTMLInputElement)?.focus()}
                    className="text-sm absolute peer-valid:-top-2 text-zinc-400 peer-focus:-top-2 peer-focus:font-semibold peer-valid:font-semibold peer-focus:text-xs peer-valid:text-xs peer-focus:text-black peer-valid:text-black top-2 left-0 transition-all bg-white pr-1 cursor-text"
                    htmlFor={props.id}
                >
                    {props.label}
                </label>
            )}
            {props.errors && props.errors[props.name] && (
                <small className="text-xs text-red-600">{props.errors[props.name]?.message as string}</small>
            )}
        </div>
    );
}

export default Input;
