import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";

const authorizeUser = () => {
    const isAuthenticated: boolean =
        useSelector((state: any) => state.auth.isAuthenticated) || localStorage.getItem("isAuthenticated");
    const authUser: any = useSelector((state: any) => state.auth.user) || localStorage.getItem("authUser");
    const dispatch = useDispatch();

    if (!isAuthenticated || !authUser) {
        // Clear local storage auth data.
        localStorage.removeItem("authUser");
        localStorage.removeItem("isAuthenticated");
        window.location.replace("/login");
        return false;
    }
    // Keep the user authenticated even after a full refresh
    else return dispatch(login(typeof authUser === "object" ? authUser : JSON.parse(authUser))), true;
};

export default authorizeUser;
