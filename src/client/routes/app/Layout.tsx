import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import authorizeUser from "../../utils/authorizeUser";

function AppLayout() {
    return (
        authorizeUser() && (
            <>
                <Header />
                <Outlet />
            </>
        )
    );
}

export default AppLayout;
