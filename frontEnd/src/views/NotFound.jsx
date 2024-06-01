/* eslint-disable no-unused-vars */
import React from "react";
import notFound from "../assets/image/404.svg";
export default function NotFound() {
    return (
        <div className="h-lvh flex align-middle justify-center overflow-hidden">
            <img className="w-64" src={notFound} alt="" />
        </div>
    );
}
