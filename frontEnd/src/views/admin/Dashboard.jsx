/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import NavbarAdmin from "../component/NavbarAdmin";
export default function Dashboard() {
    const profileData = {
        name: "John Doe",
        bio: "Web Developer",
        image: "https://example.com/profile-image.jpg",
    };
    // Data contoh untuk project, contact, dan connection
    const projectCount = 15;
    const contactData = [
        {
            name: "Alice",
            email: "alice@example.com",
            phone: "+1234567890",
            message: "Hello!",
        },
        {
            name: "Bob",
            email: "bob@example.com",
            phone: "+9876543210",
            message: "Hi there!",
        },
    ];
    const connectionData = [
        {
            name: "Eve",
            email: "eve@example.com",
            phone: "+1111111111",
            message: "Nice to connect!",
        },
        {
            name: "Charlie",
            email: "charlie@example.com",
            phone: "+9999999999",
            message: "Greetings!",
        },
        // ... (tambahkan data lainnya jika diperlukan)
    ];

    return (
        <div className="admin-dashboard p-8">
            <div className="profile-section mb-8">
                <h2 className="text-2xl font-bold mb-4">Profile</h2>
                <div className="flex items-center">
                    <img
                        src={profileData.image}
                        alt="Profile"
                        className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                        <h3 className="text-lg font-semibold">
                            {profileData.name}
                        </h3>
                        <p className="text-gray-600">{profileData.bio}</p>
                    </div>
                </div>
            </div>

            <div className="stats-section mb-8">
                <h2 className="text-2xl font-bold mb-4">Statistics</h2>
                <div className="grid grid-cols-3 gap-4">
                    <div className="stat-item p-4 bg-blue rounded-md hover:brightness-75 duration-500">
                        <h3 className="text-xl font-bold">{projectCount}</h3>
                        <p>Projects</p>
                    </div>
                    <div className="stat-item p-4 bg-blue rounded-md hover:brightness-75 duration-500">
                        <h3 className="text-xl font-bold">{projectCount}</h3>
                        <p>Contact</p>
                    </div>
                    <div className="stat-item p-4 bg-blue rounded-md hover:brightness-75 duration-500">
                        <h3 className="text-xl font-bold">{projectCount}</h3>
                        <p>Connection</p>
                    </div>
                </div>
            </div>

            <div className="contact-section mb-8">
                <h2 className="text-2xl font-bold mb-4">Contact</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="py-2">Name</th>
                            <th className="py-2">Email</th>
                            <th className="py-2">Phone</th>
                            <th className="py-2">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contactData.map((contact, index) => (
                            <tr key={index}>
                                <td className="py-2">{contact.name}</td>
                                <td className="py-2">{contact.email}</td>
                                <td className="py-2">{contact.phone}</td>
                                <td className="py-2">{contact.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="connection-section mb-8">
                <h2 className="text-2xl font-bold mb-4">Connection</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="py-2">Name</th>
                            <th className="py-2">Email</th>
                            <th className="py-2">Phone</th>
                            <th className="py-2">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {connectionData.map((contact, index) => (
                            <tr key={index}>
                                <td className="py-2">{contact.name}</td>
                                <td className="py-2">{contact.email}</td>
                                <td className="py-2">{contact.phone}</td>
                                <td className="py-2">{contact.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
