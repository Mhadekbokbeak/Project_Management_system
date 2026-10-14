import axios from "axios";

const apiUrl = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/+$/, "");
const apiBaseUrl = apiUrl.endsWith("/api") ? apiUrl : `${apiUrl}/api`;

const API = axios.create({
    baseURL: apiBaseUrl,
});

// แนบ Token จาก localStorage ใน Header ทุกครั้งที่เรียกใช้งาน API
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    };

    return req;
});

export default API;