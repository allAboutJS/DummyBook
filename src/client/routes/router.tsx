import { createBrowserRouter } from "react-router-dom";
import Index from "./Index";
import Login from "./Login";
import Feed from "./app/Feed";
import AppLayout from "./app/Layout";
import CreatePost from "./app/Create";

const router = createBrowserRouter([
    {
        index: true,
        element: <Index />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/app",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <Feed />
            },
            {
                path: "/app/feed",
                element: <Feed />
            },
            {
                path: "/app/create",
                element: <CreatePost />
            }
        ]
    }
]);

export default router;
