/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import Sidebar from "../admin/Sidebar";
import { useLocation } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import Api from "../../contexts/Api";
import { useNavigate } from "react-router-dom";
export default function AdminPage() {
    const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const currentLocation = location.pathname;
    const { token } = useStateContext();
    const [user, _setUser] = useState({});
    const navigate = useNavigate();
    const setUser = async () => {
        setIsLoading(true);
        const response = await Api.get("/auth/me", null);
        if (!response) {
            navigate("/login-admin");
            return;
        }
        setIsLoading(false);

        _setUser(response.data);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsOpen(window.innerWidth > 768);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    useEffect(() => {
        setUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (!token) {
        return <Navigate to={"/"} />;
    }

    return (
        <div className="flex">
            <Sidebar active={currentLocation} isOpen={isOpen} />
            <div className="mainpage bg-deep-blue w-full min-h-screen">
                <NavbarAdmin
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    user={user}
                    isLoading={isLoading}
                />
                <Outlet />
            </div>
        </div>
    );
}
