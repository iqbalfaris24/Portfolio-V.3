import axios from "axios";

const Api = axios.create({
    // baseURL: "http://localhost:8000/api",
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,
});

Api.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";
    config.headers["Content-Type"] = "multipart/form-data";

    return config;
});

Api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;
        if (response.status === 401) {
            localStorage.removeItem("ACCESS_TOKEN");
        } else {
            throw error;
        }
    }
);
export default Api;
