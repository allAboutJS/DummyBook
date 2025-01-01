import { InputHTMLAttributes } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    register?: UseFormRegister<FieldValues>;
    errors?: FieldErrors<FieldValues>;
    errorMessages?: {
        empty?: string;
        invalid?: string;
    };
    "custom-pattern"?: RegExp;
}

export default InputProps;
