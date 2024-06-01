import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import MainPage from "./views/MainPage";
import Profile from "./views/admin/Profile";
import Project from "./views/admin/Project";
import Contact from "./views/admin/Contact";
import Connection from "./views/admin/Connection";
import PortfolioPage from "./views/component/PortfolioPage";
import AdminPage from "./views/component/AdminPage";
import Dashboard from "./views/admin/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PortfolioPage />,
        children: [
            {
                path: "/",
                element: <MainPage />,
            },
            {
                path: "/login/login-admin",
                element: <Login />,
            },
        ],
    },
    {
        path: "/",
        element: <AdminPage />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/project",
                element: <Project />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/connection",
                element: <Connection />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
