/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";
import { RiTiktokLine } from "react-icons/ri";
import {
    FiGithub,
    FiInstagram,
    FiLinkedin,
    FiTwitter,
    FiFacebook,
} from "react-icons/fi";
import Api from "../../contexts/Api";
import ScaleLoader from "react-spinners/ScaleLoader";
import ReCAPTCHA from "react-google-recaptcha";
import defaultPic from "../../assets/image/Pic/pic.jpg";

export default function ConnectionRefl(props) {
    const [formConnection, setFormConnection] = useState({});
    const [connectionError, setConnectionError] = useState({});
    const [isConnectionSending, setIsConnectionSending] = useState(false);
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

    const handleChangeFormConnection = (e) => {
        let value;
        if (e.target.type === "textarea") {
            if (e.target.value.length <= 250) {
                value = e.target.value;
                setFormConnection((prevData) => ({
                    ...prevData,
                    [e.target.name]: value,
                }));
            }
        } else {
            if (e.target.type === "file") {
                value = e.target.files[0];
            } else {
                value = e.target.value;
            }
            setFormConnection((prevData) => ({
                ...prevData,
                [e.target.name]: value,
            }));
        }

        setConnectionError((prevData) => ({
            ...prevData,
            [e.target.name]: null,
        }));

        const textarea = e.target;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const handleSocialMediaChange = (e) => {
        const value = e.target.value;
        setFormConnection((prevData) => ({
            ...prevData,
            socialMedia: {
                ...prevData.socialMedia,
                [e.target.name]: value,
            },
        }));
    };

    const handleKeyDown = (e) => {
        // Mencegah pengguna menekan tombol Enter
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    const submitConnection = async () => {
        console.log(formConnection);
        try {
            setIsConnectionSending(true);
            const response = await Api.post("/send/connection", formConnection);
            setIsConnectionSending(false);
            setFormConnection({});
            props.fetchPortfolio();
        } catch (error) {
            setIsConnectionSending(false);
            setConnectionError(error.response.data);
        }
    };

    const calculateSosmedCount = (datas) => {
        let data = JSON.parse(datas);
        const itemCount = Object.keys(data ?? 0).length;
        return itemCount;
    };

    const SocialMediaComponent = (data) => {
        let socialMediaObject = JSON.parse(data.data);
        return (
            <>
                <h1 className="flex m-auto space-x-2">
                    <div
                        className={`flex items-center ${
                            socialMediaObject?.instagram ? `` : `hidden`
                        }`}
                        href="https://dribbble.com/JulianoF"
                    >
                        <FiInstagram className="" />
                        <span className="ml-1 text-teal-400">
                            @{socialMediaObject?.instagram}
                        </span>
                    </div>
                    <div
                        className={`flex items-center ${
                            socialMediaObject?.tiktok ? `` : `hidden`
                        }`}
                        href="https://dribbble.com/JulianoF"
                    >
                        <RiTiktokLine className="" />
                        <span className="ml-1 text-teal-400">
                            @{socialMediaObject?.tiktok}
                        </span>
                    </div>
                    <div
                        className={`flex items-center ${
                            socialMediaObject?.linkedin ? `` : `hidden`
                        }`}
                        href="https://dribbble.com/JulianoF"
                    >
                        <FiLinkedin className="" />
                        <span className="ml-1 text-teal-400">
                            @{socialMediaObject?.linkedin}
                        </span>
                    </div>
                    <div
                        className={`flex items-center ${
                            socialMediaObject?.twitter ? `` : `hidden`
                        }`}
                        href="https://dribbble.com/JulianoF"
                    >
                        <FiTwitter className="" />
                        <span className="ml-1 text-teal-400">
                            @{socialMediaObject?.twitter}
                        </span>
                    </div>
                    <div
                        className={`flex items-center ${
                            socialMediaObject?.github ? `` : `hidden`
                        }`}
                        href="https://dribbble.com/JulianoF"
                    >
                        <FiGithub className="" />
                        <span className="ml-1 text-teal-400">
                            @{socialMediaObject?.github}
                        </span>
                    </div>
                    <div
                        className={`flex items-center ${
                            socialMediaObject?.facebook ? `` : `hidden`
                        }`}
                        href="https://dribbble.com/JulianoF"
                    >
                        <FiFacebook className="" />
                        <span className="ml-1 text-teal-400">
                            @{socialMediaObject?.facebook}
                        </span>
                    </div>
                </h1>
            </>
        );
    };

    useEffect(() => {
        return () => {
            clearTimeout();
        };
    }, []);
    return (
        <>
            <div className="heading mb-16">
                <h1 className="text-center text-2xl font-bold text-secondary">
                    Connection Reflections
                </h1>
                <h1 className="text-center italic text-paragraph font-mono">
                    Beyond Words, Beyond Bonds – Connection Reflections, Where
                    Relationships Speak Volumes.
                </h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 container">
                <div className="m-auto">
                    <div className="text">
                        <h1 className="text-center font-semibold capitalize text-xl	text-tertiary  md:mt-0">
                            Reflections on Me
                        </h1>
                    </div>
                    <div className="card-swiper mt-4 border p-16 rounded-xl">
                        {props.biodata?.connection ? (
                            <Swiper
                                effect={"cards"}
                                grabCursor={true}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false,
                                }}
                                modules={[EffectCards, Autoplay]}
                                className="mySwiper"
                            >
                                {props.biodata?.connection?.map((data) => {
                                    return (
                                        <SwiperSlide
                                            key={data.id}
                                            className="text-center rounded-2xl bg-background border-2 border-orange md:p-4 flex align-middle items-center justify-center"
                                        >
                                            <div className="swiper-item mx-auto shadow-md rounded-md">
                                                {/* Gambar dengan div untuk overflow hidden */}
                                                <div className="relative overflow-hidden mt-10">
                                                    <div className="w-32 h-32 relative mx-auto">
                                                        <div className="w-full h-full rounded-full absolute top-0 left-0 border-2 border-x-tertiary hover:animate-spin"></div>
                                                        {data.profileImage ? (
                                                            <img
                                                                className="w-full h-full object-cover rounded-full"
                                                                src={`${props.baseStorageURL}/${data.profileImage}`}
                                                                alt="User Photo"
                                                            />
                                                        ) : (
                                                            <img
                                                                className="w-full h-full object-cover rounded-full"
                                                                src={`${defaultPic}`}
                                                                alt="User Photo"
                                                            />
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Informasi nama dan pesan */}
                                                <div className="md:p-4">
                                                    <h2 className="text-xl font-bold mb-2">
                                                        {data.name}
                                                    </h2>
                                                    <p className="text-sm md:mb-4 ">
                                                        {data.message}
                                                    </p>
                                                    {/* Social Media */}
                                                    <div className="m-scroll">
                                                        <div
                                                            className={`${
                                                                calculateSosmedCount(
                                                                    data.socialMedia
                                                                ) > 2
                                                                    ? `m-scroll__title`
                                                                    : ``
                                                            }`}
                                                        >
                                                            <div className="flex space-x-2 ml-2">
                                                                <SocialMediaComponent
                                                                    data={
                                                                        data.socialMedia
                                                                    }
                                                                ></SocialMediaComponent>

                                                                <div
                                                                    className={`${
                                                                        calculateSosmedCount(
                                                                            data.socialMedia
                                                                        ) < 2
                                                                            ? `hidden`
                                                                            : ``
                                                                    }`}
                                                                >
                                                                    <SocialMediaComponent
                                                                        className=""
                                                                        data={
                                                                            data.socialMedia
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        ) : (
                            <div
                                role="status"
                                className="mySwiper mx-auto p-8 text-center rounded-2xl bg-background border-2 border-gray-200 shadow animate-pulse dark:border-gray-700"
                            >
                                <div className="flex flex-col items-center mt-4">
                                    <div className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700 mb-2">
                                        <svg
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                                        <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    </div>
                                </div>
                                <span className="sr-only">Loading...</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="form p-2">
                    <h1 className="text-center font-semibold capitalize text-xl	text-tertiary mt-10 md:mt-0">
                        Express your views on my personality in Connection
                        Reflections – your perspective is valuable!
                    </h1>
                    {/* max-w-md mx-auto mt-10 p-6 */}
                    <div className=" rounded-md shadow-md mt-10 border p-6">
                        {/* Image Input */}
                        <div className="mb-4 text-center ">
                            <label
                                htmlFor="image"
                                className={`block text-lg text-left font-medium ${
                                    connectionError?.profileImage
                                        ? `text-red-600`
                                        : `text-white`
                                }`}
                            >
                                Profile Image (Optional)
                            </label>

                            <div
                                className={`mt-1 relative bg-slate-100 rounded-md shadow-sm border ${
                                    connectionError?.profileImage
                                        ? `border-red-600`
                                        : ``
                                }`}
                            >
                                <label
                                    htmlFor="profileImage"
                                    className="cursor-pointer "
                                >
                                    <div className="aspect-w-1 aspect-h-1 rounded-md overflow-hidden">
                                        <div className="flex items-center justify-center">
                                            <span className="text-gray-300">
                                                <label
                                                    className="text-slate-800 cursor-pointer text-lg"
                                                    htmlFor="profileImage"
                                                >
                                                    {formConnection
                                                        ?.profileImage
                                                        ?.name ?? (
                                                        <svg
                                                            className="h-8 w-8 text-slate-800"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                            ></path>
                                                        </svg>
                                                    )}
                                                </label>
                                            </span>
                                        </div>
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    id="profileImage"
                                    name="profileImage"
                                    className="sr-only"
                                    onChange={(e) =>
                                        handleChangeFormConnection(e)
                                    }
                                />
                            </div>
                            {connectionError?.profileImage?.map((error) => (
                                <p
                                    key={error}
                                    className="text-sm text-red-600 dark:text-red-500"
                                >
                                    {error}
                                </p>
                            ))}
                        </div>
                        {/* Name Input */}
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className={`block text-lg text-left font-medium ${
                                    connectionError?.name
                                        ? `text-red-600`
                                        : `text-white`
                                }`}
                            >
                                Name <label className="text-red-600">*</label>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formConnection.name || ""}
                                onChange={(e) => handleChangeFormConnection(e)}
                                className="mt-1 p-2 w-full border rounded-md"
                                style={{
                                    wordWrap: "break-word",
                                    whiteSpace: "pre-wrap",
                                }}
                            />
                            {connectionError?.name?.map((error) => (
                                <p
                                    key={error}
                                    className="text-sm text-red-600 dark:text-red-500"
                                >
                                    {error}
                                </p>
                            ))}
                        </div>
                        {/* Message Input */}
                        <div className="mb-4">
                            <div className="label flex items-end justify-between">
                                <label
                                    htmlFor="messageConn"
                                    className={`block text-lg text-left font-medium ${
                                        connectionError?.message
                                            ? `text-red-600`
                                            : `text-white`
                                    }`}
                                >
                                    Message
                                    <label className="text-red-600"> *</label>
                                </label>
                                <label
                                    htmlFor="word-count"
                                    onKeyDown={(e) => handleKeyDown(e)}
                                    className={`${
                                        formConnection.message?.length === 250
                                            ? `text-red-600`
                                            : ``
                                    }`}
                                >
                                    {formConnection.message?.length ?? "0"}/250
                                </label>
                            </div>
                            <textarea
                                id="message"
                                name="message"
                                value={formConnection.message || ""}
                                onChange={(e) => handleChangeFormConnection(e)}
                                onKeyDown={(e) => handleKeyDown(e)}
                                rows="1"
                                className="mt-1 p-2 w-full border rounded-md resize-none"
                                style={{ overflow: "hidden" }}
                            ></textarea>
                            {connectionError?.message?.map((error) => (
                                <p
                                    key={error}
                                    className="text-sm text-red-600 dark:text-red-500"
                                >
                                    {error}
                                </p>
                            ))}
                        </div>
                        {/* Social Media Inputs */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center space-x-2">
                                <FiInstagram className="text-2xl text-white" />
                                <input
                                    type="text"
                                    id="instagram"
                                    name="instagram"
                                    value={
                                        formConnection.socialMedia?.instagram ||
                                        ""
                                    }
                                    onChange={(e) => handleSocialMediaChange(e)}
                                    className="p-2 border rounded-md flex-grow "
                                    placeholder="Instagram Username (Optional)"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <RiTiktokLine className="text-2xl text-white" />
                                <input
                                    type="text"
                                    id="tiktok"
                                    name="tiktok"
                                    value={
                                        formConnection.socialMedia?.tiktok || ""
                                    }
                                    onChange={(e) => handleSocialMediaChange(e)}
                                    className="p-2 border rounded-md flex-grow"
                                    placeholder="TikTok Username (Optional)"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <FiTwitter className="text-2xl text-white" />
                                <input
                                    type="text"
                                    id="twitter"
                                    name="twitter"
                                    value={
                                        formConnection.socialMedia?.twitter ||
                                        ""
                                    }
                                    onChange={(e) => handleSocialMediaChange(e)}
                                    className="p-2 border rounded-md flex-grow"
                                    placeholder="Twitter Username (Optional)"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <FiLinkedin className="text-2xl text-white" />
                                <input
                                    type="text"
                                    id="linkedin"
                                    name="linkedin"
                                    value={
                                        formConnection.socialMedia?.linkedin ||
                                        ""
                                    }
                                    onChange={(e) => handleSocialMediaChange(e)}
                                    className="p-2 border rounded-md flex-grow"
                                    placeholder="LinkedIn Username (Optional)"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <FiGithub className="text-2xl text-white" />
                                <input
                                    type="text"
                                    id="github"
                                    name="github"
                                    value={
                                        formConnection.socialMedia?.github || ""
                                    }
                                    onChange={(e) => handleSocialMediaChange(e)}
                                    className="p-2 border rounded-md flex-grow"
                                    placeholder="GitHub Username (Optional)"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <FiFacebook className="text-2xl text-white" />
                                <input
                                    type="text"
                                    id="facebook"
                                    name="facebook"
                                    value={
                                        formConnection.socialMedia?.facebook ||
                                        ""
                                    }
                                    onChange={(e) => handleSocialMediaChange(e)}
                                    className="p-2 border rounded-md flex-grow"
                                    placeholder="Facebook Username (Optional)"
                                />
                            </div>
                        </div>
                        <div className="flex m-auto justify-center my-4">
                            <ReCAPTCHA
                                sitekey="6LftLUkpAAAAABwXmTrh6m1HrDL7QbECw6F7HyDR"
                                onChange={verification}
                            />
                        </div>
                        {/* Submit Button */}
                        <button
                            type="button"
                            onClick={() => submitConnection()}
                            className={`${
                                isConnectionSending
                                    ? `bg-tertiary-hover cursor-not-allowed`
                                    : ``
                            } ${
                                isVerified
                                    ? ``
                                    : `hover:cursor-not-allowed bg-tertiary-hover`
                            } w-full p-2 duration-300 font-bold bg-tertiary text-white rounded-md hover:bg-tertiary-hover focus:outline-none focus:ring  focus:border-tertiary-hover`}
                            disabled={!isVerified}
                        >
                            {isConnectionSending ? (
                                <ScaleLoader color="#ffffff" height={16} />
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
