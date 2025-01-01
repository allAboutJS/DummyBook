import { useRef } from "react";
import InputProps from "../@types/Input";

/**
 * Renders an enhanced input field with support for validation, labels, and error messages.
 *
 * This component integrates seamlessly with form libraries like `react-hook-form` using the `register` prop.
 * It offers dynamic behaviors such as floating labels, error messages, and customizable validation rules.
 *
 * **Props:**
 * - **name** *(string)*: The name of the input field (used for form handling).
 * - **label** *(string | undefined)*: The label displayed for the input field.
 * - **placeholder** *(string | undefined)*: The placeholder text shown when no value is entered.
 * - **disabled** *(boolean | undefined)*: Disables the input if set to `true`.
 * - **required** *(boolean | undefined)*: Marks the field as required.
 * - **custom-pattern** *(string | undefined)*: A regex string for custom validation patterns.
 * - **errorMessages** *(object | undefined)*:
 *   - **empty** *(string | undefined)*: Error message when the field is empty but required.
 *   - **invalid** *(string | undefined)*: Error message when the input doesn't match the validation pattern.
 * - **register** *(function | undefined)*: Function from `react-hook-form` for form registration.
 * - **errors** *(Record<string, FieldError> | undefined)*: Object containing field validation errors.
 * - **id** *(string | undefined)*: Unique identifier for the input element.
 *
 * **Behavior:**
 * - If `register` is provided, the input integrates with form validation.
 * - Floating label behavior when focused or valid.
 * - Displays error messages below the input field if validation fails.
 *
 * **Styling:**
 * - The floating label moves above the input when the field is focused or contains a valid value.
 * - Error messages are styled in red for visibility.
 *
 * @param props - The props for configuring the input component.
 * @returns A styled input field with optional label, validation, and error display.
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
