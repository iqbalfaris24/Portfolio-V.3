/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
    BsFillHouseDoorFill,
    BsPersonFill,
    BsBox,
    BsEnvelope,
    BsPeopleFill,
} from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import Api from "../../contexts/Api";
import { useNavigate } from "react-router-dom";
const Sidebar = (props) => {
    const { active, isOpen } = props;
    const navigate = useNavigate();
    const menuItemClass = (page) =>
        `duration-300 flex items-center mb-8 cursor-pointer p-4 rounded-lg hover:bg-orange duration-300 ${
            active === page
                ? "bg-orange font-bold hover:brightness-75 duration-500"
                : ""
        }`;

    const MenuItem = ({ icon, label, to }) => (
        <Link className={menuItemClass(to.toLowerCase())} to={to}>
            <span className="mr-2">{icon}</span>
            <h1>{label}</h1>
        </Link>
    );

    const logout = async (e) => {
        e.preventDefault();
        await Api.post("/auth/logout", null);
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("USER_PROFILE");
        navigate("/login-admin");
    };
    return (
        <div
            className={`sidebar flex flex-col justify-between w-72 duration-300 ${
                isOpen ? `ml-0` : `-ml-72`
            }`}
        >
            <div className="menu-item p-4 ">
                <Link to="/">
                    <div className="border text-center py-6 mb-12 rounded-2xl hover:brightness-75 duration-500">
                        <h1 className="text-3xl">PORTFOLIO</h1>
                    </div>
                </Link>
                <MenuItem
                    icon={<BsFillHouseDoorFill />}
                    label="Dashboard"
                    to="/dashboard"
                />
                <MenuItem
                    icon={<BsPersonFill />}
                    label="Profile"
                    to="/profile"
                />
                <MenuItem icon={<BsBox />} label="Project" to="/project" />
                <MenuItem icon={<BsEnvelope />} label="Contact" to="/contact" />
                <MenuItem
                    icon={<BsPeopleFill />}
                    label="Connection"
                    to="/connection"
                />
            </div>
            <button
                onClick={logout}
                className="logout font-bold border-t-2 text-center flex items-center justify-center p-4 hover:bg-secondary"
            >
                Logout &nbsp;
                <FiLogOut />
            </button>
        </div>
    );
};

export default Sidebar;
