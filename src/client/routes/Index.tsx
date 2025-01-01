import Input from "../components/Input";
import Logo from "../components/Logo";
import { FieldValues, useForm } from "react-hook-form";
import Helmet from "../components/Helmet";
import { CgSpinner } from "react-icons/cg";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * The Index component is responsible for handling user registration.
 * It renders a form for users to create a new account by entering their full name, email, password, and confirm password.
 * The form submission is handled by the `submitForm` function, which sends a POST request to the server's registration API.
 * If the registration is successful, the user is redirected to the login page.
 * If there are any errors during the registration process, appropriate error messages are displayed using the `toast` library.
 */
function Index() {
    const navigate = useNavigate();
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        setError,
        watch,
        getValues
    } = useForm({ mode: "onBlur" });

    const cPassword = watch("c-password");

    const submitForm = useCallback(
        async (data: FieldValues) => {
            if (cPassword !== data.password)
                return setError("c-password", { message: "Passwords do not match!" }, { shouldFocus: true });

            delete data["c-password"];

            try {
                const response = await axios.post("/api/register", data);

                if (response.status !== 201 || response.data.status !== "success") toast.error(response.data.message);
                else toast.success(response.data.message), navigate("/login");
            } catch (error: any) {
                console.error(error);

                if (error.isAxiosError) {
                    const { response } = error as AxiosError<{ message: string }>;

                    if (response && (response.status === 400 || response.status === 409 || response.status === 403))
                        toast.error(response.data.message);
                    else toast.error("An error occurred while registering. Please try again later.");
                } else toast.error("An error occurred while registering. Please try again later.");
            }
        },
        [getValues()]
    );

    return (
        <main className="bg-zinc-900 min-h-screen flex flex-col justify-center items-center">
            <Helmet>
                <title>DummyBook | Sign Up</title>
            </Helmet>
            <form
                onSubmit={handleSubmit(submitForm)}
                className="px-4 py-8 rounded-md shadow-md max-w-sm bg-white w-full space-y-10"
            >
                <div className="text-center flex items-center flex-col">
                    <h1 aria-label="DummyBook" className="mb-4">
                        <Logo />
                    </h1>
                    <h2 className="text-2xl font-bold">Sign Up</h2>
                    <p className="text-sm max-w-xs">Create an account to connect to get started using the app</p>
                </div>
                <div className="space-y-5">
                    <Input
                        required
                        register={register}
                        errors={errors}
                        custom-pattern={/^[\w'\-]+\s*([\w'\-]+)*$/}
                        name="fullname"
                        label="Full name"
                    />
                    <Input
                        required
                        register={register}
                        errors={errors}
                        custom-pattern={/^([a-zA-Z0-9.\-]{3,}@[a-zA-Z0-9]{2,}).[a-zA-Z0-9]{2,}$/}
                        name="email"
                        label="Email"
                    />
                    <Input
                        required
                        register={register}
                        errors={errors}
                        name="password"
                        custom-pattern={/^.{6,}$/}
                        label="Password"
                    />
                    <Input required register={register} errors={errors} name="c-password" label="Confirm password" />
                </div>
                <button
                    disabled={isSubmitting}
                    className="p-2 rounded-md text-center w-full bg-zinc-600 text-white font-semibold text-sm flex justify-center disabled:opacity-50 disabled:cursor-not-allowed h-10 items-center"
                    type="submit"
                >
                    {isSubmitting ? <CgSpinner className="animate-spin" /> : "Submit"}
                </button>
                <p className="text-sm text-center">
                    Have an account?{" "}
                    <Link to={"/login"} className="text-zinc-500 font-semibold hover:underline">
                        Sign in
                    </Link>
                </p>
            </form>
        </main>
    );
}

export default Index;
