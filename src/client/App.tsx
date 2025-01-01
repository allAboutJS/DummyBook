import { RouterProvider } from "react-router-dom";
import "./App.css";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { login, logout } from "./store/slices/authSlice";
import router from "./routes/router";

function App() {
    const auth = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    return <RouterProvider router={router} />;
}

export default App;
