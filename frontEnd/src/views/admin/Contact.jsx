/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaEye, FaTrash } from "react-icons/fa";
import Api from "../../contexts/Api";

export default function Contact() {
    const [contact, setContact] = useState({});

    const fetchContact = async () => {
        try {
            const response = await Api.get("/contact");
            setContact(response.data.Contact);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await Api.delete(`/contact/${id}`);
                fetchContact();
                Swal.fire({
                    title: "Deleted!",
                    text: "Project has been deleted.",
                    icon: "success",
                });
            }
        });
    };

    useEffect(() => {
        fetchContact();
    }, []);
    return (
        <div className="admin-dashboard p-8">
            <div className="contact-section mb-8 overflow-auto w-full">
                <h2 className="text-2xl font-bold mb-4">Contact</h2>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-white font-bold uppercase bg-gray-700">
                            <tr className="text-left">
                                <th className="p-2">Name</th>
                                <th className="p-2">Email</th>
                                <th className="p-2">Phone</th>
                                <th className="p-2">Message</th>
                                <th className="p-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(contact) &&
                                contact.map((contact, index) => (
                                    <tr
                                        key={index}
                                        className=" text-white odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700"
                                    >
                                        <td className="p-2">{contact.name}</td>
                                        <td className="p-2">{contact.email}</td>
                                        <td className="p-2">
                                            {contact.phoneNumber}
                                        </td>
                                        <td className="p-2">
                                            {contact.message}
                                        </td>
                                        <td className="p-2 flex justify-center gap-6">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(contact.id)
                                                }
                                                className="p-2 rounded-lg bg-red-700 hover:brightness-75"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
