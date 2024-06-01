/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../contexts/Api";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useStateContext } from "../contexts/ContextProvider";
export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const { token, setUser, setToken } = useStateContext();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        setIsLoading(true);
        setError(null);

        try {
            const response = await Api.post("/auth/login", data);
            setToken(response.data.token);
            setIsLoading(false);
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            // setError({ incorrect: ["Email or Password Incorrect"] });
            setIsLoading(false);
            if (error && error.response.status === 422) {
                setError(error.response.data);
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        if (localStorage.removeItem("ACCESS_TOKEN")) {
            navigate("/dashboard");
        }
    }, [token, navigate]); // Daftar dependensi yang harus dimonitor

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="login-page border border-orange w-96 h-96 p-8 rounded-xl">
                <h1 className="text-center font-bold text-4xl mb-12">
                    Login Page
                </h1>
                <label>
                    {error &&
                        Object.values(error)
                            ?.flat()
                            .map((errorMessage, index) => (
                                <h1
                                    className={`error text-red ${
                                        error ? "" : "hidden"
                                    }`}
                                    key={index}
                                >
                                    {errorMessage}
                                </h1>
                            ))}
                </label>

                <form onSubmit={(e) => login(e)}>
                    <div className="email mb-4">
                        <label htmlFor="password">Email :</label>
                        <input
                            ref={emailRef}
                            className="border border-orange rounded-md w-full text-xl"
                            type="email"
                            name="email"
                            id="email"
                        />
                    </div>
                    <div className="password mb-4">
                        <label htmlFor="password">Password :</label>
                        <input
                            ref={passwordRef}
                            className="border border-orange rounded-md w-full text-xl"
                            type="password"
                            name="password"
                            id="password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="border border-secondary p-4 rounded-xl font-bold w-full hover:bg-secondary duration-300"
                    >
                        {isLoading ? (
                            <label htmlFor="">
                                <ScaleLoader color="#ffffff" height={16} />
                            </label>
                        ) : (
                            <label htmlFor="">Login</label>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
