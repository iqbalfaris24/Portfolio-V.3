/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { Typewriter } from "react-simple-typewriter";
import {
    FiGithub,
    FiGlobe,
    FiCode,
    FiCoffee,
    FiRepeat,
    FiArrowUp,
} from "react-icons/fi";
import photo from "../assets/image/foto.png";
import vectorProfile from "../assets/image/profileVector.svg";
import laravel from "../assets/image/laravel.png";
import react from "../assets/image/react.png";
import vite from "../assets/image/vite.png";
import bootstrap from "../assets/image/bootstrap.png";
import Api from "../contexts/Api";
import tailwind from "../assets/image/tailwind.png";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/element/css/autoplay";
import Contact from "./portfolio/Contact";
import ConnectionRefl from "./portfolio/ConnectionRefl";
import ScaleLoader from "react-spinners/ScaleLoader";

function MainPage() {
    const [biodata, setBiodata] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const baseStorageURL = import.meta.env.VITE_APP_BASE_STORAGE_URL;
    const [isLoading, setIsLoading] = useState(false);

    const handleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const fetchPortfolio = async () => {
        try {
            const response = await Api.get("/portfolio");
            setBiodata(response.data);
        } catch (error) {
            console.log("Get Some Error: ", error);
        }
    };

    const handleDownload = async (data) => {
        setIsLoading(true);

        try {
            const response = await Api.get(`portfolio/${data.id}`, {
                responseType: "blob", // Set responseType to 'blob' to handle binary data (file)
            });

            // Membuat URL untuk file
            const fileURL = window.URL.createObjectURL(
                new Blob([response.data])
            );

            // Membuat link untuk file dan mengkliknya untuk mengunduh
            const link = document.createElement("a");
            link.href = fileURL;
            link.setAttribute(
                "download",
                "Curriculum Vitae - Iqbal Faris Akbar.pdf"
            );
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading file:", error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    // Fetch Data
    useEffect(() => {
        fetchPortfolio();
    }, []);
    return (
        <div className="portfolio-page overflow-x-hidden">
            <Tooltip id="my-tooltip" />
            <div className="navbar h-16 w-full flex justify-center md:justify-end">
                <div className="navbar-item w-1/2 hidden md:flex justify-around my-auto font-bold text-heading items-center">
                    <h3
                        className="cursor-pointer"
                        onClick={() => scrollToSection("profile")}
                    >
                        Profile
                    </h3>
                    <h3
                        className="cursor-pointer"
                        onClick={() => scrollToSection("project")}
                    >
                        Project
                    </h3>
                    <h3
                        className="cursor-pointer"
                        onClick={() => scrollToSection("contact")}
                    >
                        Contact
                    </h3>
                    <h3
                        className="cursor-pointer"
                        onClick={() =>
                            scrollToSection("connection-reflections")
                        }
                    >
                        Connection Reflections
                    </h3>
                    <a
                        className="cursor-pointer border p-2 rounded-xl hover:brightness-75"
                        href="https://github.com/iqbalfaris24"
                        target="_blank"
                        rel="noreferrer"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="My Github"
                        data-tooltip-place="bottom"
                    >
                        <FiGithub className="text-3xl" />
                    </a>
                </div>
                <div className="navbar-item-mobile w-full flex md:hidden justify-between my-auto px-4 font-bold text-heading items-center">
                    <h3
                        className="cursor-pointer"
                        onClick={() => scrollToSection("profile")}
                    >
                        Profile
                    </h3>
                    <h3
                        className="cursor-pointer"
                        onClick={() => scrollToSection("project")}
                    >
                        Project
                    </h3>
                    <h3
                        className="cursor-pointer"
                        onClick={() => scrollToSection("contact")}
                    >
                        Contact
                    </h3>
                    <h3
                        className="cursor-pointer"
                        onClick={() =>
                            scrollToSection("connection-reflections")
                        }
                    >
                        Connection Reflections
                    </h3>
                    <a
                        className="cursor-pointer border p-2 rounded-xl hover:brightness-75"
                        href="https://github.com/iqbalfaris24"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FiGithub className="text-xl" />
                    </a>
                </div>
            </div>
            {/* Jumbotron */}
            <div className="jumbotron grid grid-cols-1 gap-8 lg:grid-cols-2 lg:mt-36 container">
                <div className="name flex flex-wrap justify-center lg:justify-end px-4">
                    <div className="text w-full md:w-2/3 flex items-end lg:text-left ">
                        <div className="">
                            <label className="text-secondary text-xl">
                                Hello 🙌
                            </label>
                            <h1 className="text-tertiary font-bold text-4xl">
                                I&apos;M{" "}
                                <span>
                                    {" "}
                                    <Typewriter
                                        words={[
                                            "IQBAL FARIS AKBAR",
                                            "A WEB DEVELOPER",
                                        ]}
                                        loop={0}
                                        cursor
                                        cursorStyle="|"
                                        typeSpeed={80}
                                        deleteSpeed={50}
                                        delaySpeed={1500}
                                    />
                                </span>
                            </h1>
                        </div>
                    </div>
                    <div className="stack w-full md:w-2/3 flex justify-center my-8 lg:my-0 lg:justify-start gap-8">
                        <div
                            className="grayscale hover:grayscale-0 duration-300 w-16 flex m-auto"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="Laravel"
                            data-tooltip-place="bottom"
                        >
                            <img src={laravel} className="" alt="" />
                        </div>
                        <div
                            className="grayscale hover:grayscale-0 duration-300 w-16 flex m-auto"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="Vite"
                            data-tooltip-place="bottom"
                        >
                            <img src={vite} className="" alt="" />
                        </div>
                        <div
                            className="grayscale hover:grayscale-0 duration-300 w-16 flex m-auto"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="React"
                            data-tooltip-place="bottom"
                        >
                            <img src={react} className="" alt="" />
                        </div>
                        <div
                            className="grayscale hover:grayscale-0 duration-300 w-16 flex m-auto"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="Tailwind"
                            data-tooltip-place="bottom"
                        >
                            <img src={tailwind} className="" alt="" />
                        </div>
                        <div
                            className="grayscale hover:grayscale-0 duration-300 w-16 flex m-auto"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="Bootstrap"
                            data-tooltip-place="bottom"
                        >
                            <img src={bootstrap} className="" alt="" />
                        </div>
                    </div>
                    {/* Curiculum Vitae */}
                    <div className="w-full md:w-2/3 flex justify-center lg:justify-start">
                        <button
                            disabled={isLoading}
                            type="button"
                            onClick={() => handleDownload(biodata?.profile)}
                            className="bg-tertiary-hover hover:brightness-75 duration-500 rounded-lg w-2/3 h-12 m-auto"
                        >
                            <h1 className="font-semibold text-lg">
                                {isLoading ? (
                                    <ScaleLoader color="#ffffff" height={16} />
                                ) : (
                                    "Curiculum Vitae"
                                )}
                            </h1>
                        </button>
                    </div>
                </div>

                <div className="images flex justify-center">
                    <div className="image w-64 overflow-hidden rounded-full border-4 border-orange">
                        <img src={photo} alt="" />
                    </div>
                </div>
            </div>
            {/* Profile */}
            <section
                id="profile"
                className="profile grid grid-cols-1 gap-8 lg:grid-cols-2 mt-36 container"
            >
                <div className="vector-profile text-center hidden lg:flex">
                    <img className="w-2/3" src={vectorProfile} alt="" />
                </div>

                {!biodata.profile?.biodata ? (
                    <div
                        role="status"
                        className="space-y-2.5 animate-pulse max-w-lg"
                    >
                        <div className="flex items-center w-full">
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                        </div>
                        <div className="flex items-center w-full max-w-[480px]">
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                        </div>
                        <div className="flex items-center w-full max-w-[400px]">
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                            <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                        </div>
                        <div className="flex items-center w-full max-w-[480px]">
                            <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                        </div>
                        <div className="flex items-center w-full max-w-[440px]">
                            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
                            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                            <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                        </div>
                        <div className="flex items-center w-full max-w-[360px]">
                            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                            <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <div className="biodata-profile ">
                        <h1 className="text-center text-2xl font-bold text-secondary">
                            Profile
                        </h1>
                        <p className="text-justify text-paragraph text-lg p-2.5">
                            {biodata?.profile?.biodata}
                        </p>
                    </div>
                )}
            </section>
            {/* Project */}
            <section
                id="project"
                className="project lg:grid-cols-2 mt-36 container"
            >
                <div className="projects">
                    <h1 className="text-center text-2xl font-bold text-secondary">
                        Project
                    </h1>
                    <div className="project-list mt-5 px-5 rounded-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                            {biodata.project ? (
                                biodata?.project?.map((data) => (
                                    <div
                                        key={data.id}
                                        className="card-project border-2 rounded-lg overflow-hidden flex flex-col"
                                    >
                                        <div className="image-project overflow-hidden max-h-52 ">
                                            <img
                                                src={`${baseStorageURL}/${data.thumbnail}`}
                                                alt=""
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="details-project flex items-center justify-center p-2">
                                            <p className="text-justify text-paragraph text-lg">
                                                <label
                                                    htmlFor=""
                                                    className="font-bold"
                                                >
                                                    {data.title} &nbsp;
                                                </label>
                                                {data.description}
                                            </p>
                                        </div>
                                        <div className="action-project grid grid-cols-2 mt-auto">
                                            {data.linkGithub && (
                                                <a
                                                    href={data.linkGithub}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className={`flex flex-col items-center p-1 duration-300 bg-tertiary hover:bg-tertiary-hover ${
                                                        data.linkWebsite
                                                            ? ""
                                                            : "col-span-2"
                                                    }`}
                                                >
                                                    <FiGithub className="text-xl" />{" "}
                                                    Github
                                                </a>
                                            )}
                                            {data.linkWebsite && (
                                                <a
                                                    href={data.linkWebsite}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className={`flex flex-col items-center p-1 duration-300 bg-orange hover:bg-orange-hover ${
                                                        data.linkGithub
                                                            ? ""
                                                            : "col-span-2"
                                                    }`}
                                                >
                                                    <FiGlobe className="text-xl" />{" "}
                                                    View Page
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div
                                    role="status"
                                    className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
                                >
                                    <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                        <svg
                                            className="w-10 h-10 text-gray-200 dark:text-gray-600"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 16 20"
                                        >
                                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                        </svg>
                                    </div>
                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            {/* Contact */}
            <section
                id="contact"
                className="contact grid grid-cols-1 gap-8 lg:grid-cols-2 mt-36 container p-2 lg:p-0"
            >
                <Contact />
            </section>
            {/* Connection Reflections */}
            <section
                id="connection-reflections"
                className="reflection lg:grid-cols-2 mt-36 container"
            >
                <ConnectionRefl
                    fetchPortfolio={fetchPortfolio}
                    biodata={biodata}
                    baseStorageURL={baseStorageURL}
                />
            </section>
            {/* Footer */}
            <footer className="w-full capitalize flex items-center justify-center mt-24 bg-deep-blue">
                <FiCode />
                &nbsp;
                <FiCoffee />
                &nbsp;
                <FiRepeat />
                &nbsp;
                <label htmlFor="">
                    : Fueling your coding adventures -{" "}
                    <a href="" className="text-blue font-semibold">
                        Iqbal Faris Akbar
                    </a>{" "}
                </label>
            </footer>
            {/* Back to top */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-4 right-4 p-3 bg-blue text-white rounded-full shadow-md transition-all duration-300 ${
                    isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            >
                <FiArrowUp />
            </button>
        </div>
    );
}

export default MainPage;
