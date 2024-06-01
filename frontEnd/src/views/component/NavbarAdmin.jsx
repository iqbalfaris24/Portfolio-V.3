/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { FiMenu } from "react-icons/fi";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function NavbarAdmin(props) {
    const handleToggle = () => {
        props.setIsOpen(!props.isOpen);
    };
    return (
        <div className="h-16 bg-background flex items-center justify-between px-8">
            <button
                className="text-4xl hover:brightness-75"
                onClick={() => handleToggle()}
            >
                <FiMenu />
            </button>

            <div className="profile-name border rounded-md p-2">
                {props.isLoading ? (
                    <h1>
                        {" "}
                        <ScaleLoader color="#ffffff" height={16} />
                    </h1>
                ) : (
                    <h1>{props.user?.name}</h1>
                )}
            </div>
        </div>
    );
}
