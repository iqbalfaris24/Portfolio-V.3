/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Api from "../../contexts/Api";
import ScaleLoader from "react-spinners/ScaleLoader";
import vectorContact from "../../assets/image/contactVector.svg";
import ReCAPTCHA from "react-google-recaptcha";
export default function Contact() {
    const [formContact, setFormContact] = useState({});
    const [isContactSending, setIsContactSending] = useState(false);
    const [contactError, setContactError] = useState({});
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isVerified, setIsVerified] = useState(false);

    const verification = (value) => {
        setIsVerified(true);
        startCountdown();
    };

    const startCountdown = () => {
        const countdownDuration = 60000;
        setTimeout(() => {
            setIsVerified(false);
        }, countdownDuration);
    };

    const handleInputNumberChange = (e) => {
        // Menghapus karakter selain nomor dari input
        const cleanedValue = e.target.value.replace(/\D/g, "");
        setPhoneNumber(cleanedValue);
        setFormContact((prevData) => ({
            ...prevData,
            [e.target.name]: cleanedValue,
        }));
        setContactError((prevData) => ({
            ...prevData,
            [e.target.name]: null,
        }));
    };

    const handleChangeFormContact = (e) => {
        let value;

        if (e.target.type === "file") {
            value = e.target.files[0];
        } else {
            value = e.target.value;
        }

        setFormContact((prevData) => ({
            ...prevData,
            [e.target.name]: value,
        }));
        setContactError((prevData) => ({
            ...prevData,
            [e.target.name]: null,
        }));
    };

    const submitContact = async (e) => {
        setIsContactSending(true);
        try {
            const response = await Api.post("/send/contact", formContact);
            setIsContactSending(false);
            setFormContact({});
        } catch (error) {
            setIsContactSending(false);
            setContactError(error.response.data);
            console.log(error);
        }
    };

    // Menggunakan useEffect untuk membersihkan timeout jika komponen unmount sebelum countdown selesai
    useEffect(() => {
        return () => {
            clearTimeout();
        };
    }, []);
    return (
        <>
            <div className="biodata-contact">
                <h1 className="text-center text-2xl font-bold text-secondary">
                    Contact
                </h1>
                <div className="form-input space-y-1 ">
                    <div className="sm:col-span-4">
                        <label
                            className={`${
                                contactError?.name
                                    ? `text-red-600 `
                                    : `text-white `
                            }block text-lg font-medium leading-6`}
                        >
                            Full name
                        </label>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="name"
                                id="full-name"
                                value={formContact.name || ""}
                                onChange={(e) => handleChangeFormContact(e)}
                                className={`${
                                    contactError?.name
                                        ? `border-red-600 bg-red-50`
                                        : ``
                                } p-2 w-full border rounded-md focus:outline-none focus:ring-orange focus:border-orange`}
                            />
                            {contactError?.name?.map((error) => (
                                <p
                                    key={error}
                                    className="text-sm text-red-600 dark:text-red-500"
                                >
                                    {error}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label
                            className={`${
                                contactError?.email
                                    ? `text-red-600 `
                                    : `text-white `
                            }block text-lg font-medium leading-6`}
                        >
                            Email address
                        </label>
                        <div className="mb-4">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formContact.email || ""}
                                onChange={(e) => handleChangeFormContact(e)}
                                className={`${
                                    contactError?.email
                                        ? `border-red-600 bg-red-50`
                                        : ``
                                } p-2 w-full border rounded-md focus:outline-none focus:ring-orange focus:border-orange`}
                            />
                            {contactError?.email?.map((error) => (
                                <p
                                    key={error}
                                    className="text-sm text-red-600 dark:text-red-500"
                                >
                                    {error}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label
                            className={`${
                                contactError?.phoneNumber
                                    ? `text-red-600 `
                                    : `text-white `
                            }block text-lg font-medium leading-6`}
                        >
                            Phone number
                        </label>
                        <div className="mb-4">
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formContact.phoneNumber || ""}
                                onChange={handleInputNumberChange}
                                className={`${
                                    contactError?.phoneNumber
                                        ? `border-red-600 bg-red-50`
                                        : ``
                                } p-2 w-full border rounded-md focus:outline-none focus:ring-orange focus:border-orange`}
                                required
                            />
                            {contactError?.phoneNumber?.map((error) => (
                                <p
                                    key={error}
                                    className="text-sm text-red-600 dark:text-red-500"
                                >
                                    {error}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label
                            className={`${
                                contactError?.message
                                    ? `text-red-600 `
                                    : `text-white `
                            }block text-lg font-medium leading-6`}
                        >
                            Message
                        </label>
                        <div className="mb-4">
                            <textarea
                                id="message"
                                name="message"
                                rows="3"
                                value={formContact.message || ""}
                                onChange={(e) => handleChangeFormContact(e)}
                                className={`${
                                    contactError?.message
                                        ? `border-red-600 bg-red-50`
                                        : ``
                                } p-2 w-full border rounded-md focus:outline-none focus:ring-orange focus:border-orange`}
                            ></textarea>
                            {Array.isArray(contactError?.message) &&
                                contactError?.message.map((error) => (
                                    <p
                                        key={error}
                                        className="text-sm text-red-600 dark:text-red-500"
                                    >
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>

                    <div className="flex m-auto justify-center pb-4">
                        <ReCAPTCHA
                            sitekey="6LftLUkpAAAAABwXmTrh6m1HrDL7QbECw6F7HyDR"
                            onChange={verification}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() => submitContact()}
                        className={`${
                            isContactSending
                                ? `bg-tertiary-hover cursor-not-allowed`
                                : ``
                        } ${
                            isVerified
                                ? ``
                                : `hover:cursor-not-allowed bg-tertiary-hover`
                        } w-full p-2 duration-300 font-bold bg-tertiary text-white rounded-md hover:bg-tertiary-hover focus:outline-none focus:ring  focus:border-tertiary-hover`}
                        disabled={!isVerified}
                    >
                        {isContactSending ? (
                            <ScaleLoader color="#ffffff" height={16} />
                        ) : (
                            "Submit"
                        )}
                    </button>
                </div>
            </div>
            <div className="vector-contact text-center hidden lg:flex items-center justify-center">
                <img className="w-2/3" src={vectorContact} alt="" />
            </div>
        </>
    );
}
