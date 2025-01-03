import Input from "../components/Input";
import Logo from "../components/Logo";
import { FieldValues, useForm } from "react-hook-form";
import Helmet from "../components/Helmet";
import { CgSpinner } from "react-icons/cg";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";

/**
 * The Login component is responsible for handling user authentication.
 * It renders a form for users to enter their email and password to sign in.
 * The form submission is handled by the `submitForm` function, which sends a POST request to the server's login API.
 * If the login is successful, the user is redirected to the dashboard.
 * If there are any errors during the login process, appropriate error messages are displayed using the `toast` library.
 */
function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        getValues
    } = useForm({ mode: "onBlur" });

    /**
     * Handles the form submission by sending a POST request to the server's login API.
     * If the login is successful, the user is redirected to the dashboard.
     * If there are any errors during the login process, appropriate error messages are displayed using the `toast` library.
     * @param data - The form data containing the user's email and password.
     */
    const submitForm = useCallback(
        async (data: FieldValues) => {
            try {
                const response = await axios.post("/api/login", data);

                toast.success("You've been logged in successfully");
                dispatch(login(response.data.data));
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("authUser", JSON.stringify(response.data.data));
                navigate("/app");
            } catch (error: any) {
                if (error.isAxiosError) {
                    const { response } = error as AxiosError<{ message: string }>;

                    if (response && (response.status === 404 || response.status === 401))
                        toast.error(response.data.message);
                    else toast.error("An error occurred while signing in. Please try again later.");
                } else toast.error("An error occurred while signing in. Please try again later.");
            }
        },
        [getValues()]
    );

    return (
        <main className="bg-zinc-900 min-h-screen flex flex-col justify-center items-center">
            <Helmet>
                <title>DummyBook | Login</title>
            </Helmet>
            <form
                onSubmit={handleSubmit(submitForm)}
                className="px-4 py-8 rounded-md shadow-md max-w-sm bg-white w-full space-y-10"
            >
                <div className="text-center flex items-center flex-col">
                    <h1 aria-label="DummyBook" className="mb-4">
                        <Logo />
                    </h1>
                    <h2 className="text-2xl font-bold">Sign In</h2>
                    <p className="text-sm max-w-xs">Enter your email and password to continue</p>
                </div>
                <div className="space-y-5">
                    <Input
                        required
                        register={register}
                        errors={errors}
                        custom-pattern={/^([a-zA-Z0-9.\-]{3,}@[a-zA-Z0-9]{2,}).[a-zA-Z0-9]{2,}$/}
                        name="email"
                        label="Email"
                        type="email"
                    />
                    <Input
                        required
                        register={register}
                        errors={errors}
                        name="password"
                        custom-pattern={/^.+$/}
                        label="Password"
                        type="password"
                    />
                </div>
                <button
                    disabled={isSubmitting}
                    className="p-2 rounded-md text-center w-full bg-zinc-600 text-white font-semibold text-sm flex justify-center disabled:opacity-50 disabled:cursor-not-allowed h-10 items-center"
                    type="submit"
                >
                    {isSubmitting ? <CgSpinner className="animate-spin" /> : "Submit"}
                </button>
                <div className="text-sm text-center">
                    <p>
                        I don't have an account.{" "}
                        <Link to={"/"} className="text-zinc-500 font-semibold hover:underline">
                            Sign up
                        </Link>
                    </p>
                    <p>
                        <Link to={"/reset-password"} className="text-zinc-500 font-semibold hover:underline">
                            Forgot password?
                        </Link>
                    </p>
                </div>
            </form>
        </main>
    );
}

export default Login;
