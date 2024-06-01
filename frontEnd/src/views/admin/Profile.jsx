/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Api from "../../contexts/Api";
import ScaleLoader from "react-spinners/ScaleLoader";
export default function Profile() {
    const [formData, setFormData] = useState({});
    const [formUpdate, setFormUpdate] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const handleFormChange = (e) => {
        let value;

        if (e.target.type === "file") {
            value = e.target.files[0];
        } else {
            value = e.target.value;
        }

        setFormUpdate((prevData) => ({
            ...prevData,
            [e.target.name]: value,
        }));
    };

    const TruncatedText = ({ text, maxLength }) => {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <div
                    style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: `${maxLength}px`,
                        margin: "auto",
                    }}
                >
                    {text}
                </div>
            </div>
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            if (!formData) {
                const response = await Api.post(`/biodata`, formUpdate);
            }
            const response = await Api.post(
                `/biodata/${formData.id}`,
                formUpdate,
                {
                    params: {
                        _method: "put",
                    },
                }
            );
            setFormData(response.data.profile);
            fetchData();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error("Error fetching data:", error);
        }
    };
    const fetchData = async () => {
        try {
            const response = await Api.get("/biodata");
            setFormData(response.data.profile);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [setFormData]);
    return (
        <form className="w-full max-w-lg mx-auto mt-8" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text- text-sm font-bold mb-2">
                    Profile Image:
                </label>
                <div className="flex items-center justify-between">
                    <label className="w-64 flex items-center px-4 py-2 font-semibold bg-tertiary-hover rounded border border-blue cursor-pointer hover:brightness-75">
                        <span className="mr-2">Choose a file</span>
                        <input
                            type="file"
                            className="hidden"
                            name="profileImage"
                            onChange={handleFormChange}
                        />
                    </label>
                    {formUpdate?.profileImage && (
                        <TruncatedText
                            text={formUpdate?.profileImage?.name}
                            maxLength={200}
                        />
                    )}
                </div>
            </div>

            <div className="mb-4">
                <label className="block text- text-sm font-bold mb-2">
                    CV File:
                </label>
                <div className="flex items-center justify-between">
                    <label className="w-64 flex items-center px-4 py-2 font-semibold bg-tertiary-hover rounded border border-blue cursor-pointer hover:brightness-75">
                        <span className="mr-2">Choose a file</span>
                        <input
                            type="file"
                            className="hidden"
                            name="curiculumVitae"
                            onChange={handleFormChange}
                        />
                    </label>
                    {formUpdate?.curiculumVitae && (
                        <TruncatedText
                            text={formUpdate?.curiculumVitae.name}
                            maxLength={200}
                        />
                    )}
                </div>
            </div>

            {/* <div className="mb-4">
                <label className="block text- text-sm font-bold mb-2">
                    Position:
                </label>
                <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text- leading-tight focus:outline-none focus:shadow-outline"
                    value={position}
                    onChange={handlePositionChange}
                />
            </div> */}

            <div className="mb-4">
                <label className="block text- text-sm font-bold mb-2">
                    Bio:
                </label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text- leading-tight focus:outline-none focus:shadow-outline"
                    name="biodata"
                    defaultValue={formData?.biodata}
                    onChange={handleFormChange}
                />
            </div>

            <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="bg-blue hover:brightness-75 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                {" "}
                {isLoading ? (
                    <label htmlFor="">
                        <ScaleLoader color="#ffffff" height={16} />
                    </label>
                ) : formData ? (
                    "Update Profile"
                ) : (
                    "Add Profile"
                )}{" "}
            </button>
        </form>
    );
}
