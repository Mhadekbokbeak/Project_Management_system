import axios from "axios";

const API = axios.create({
    baseURL:"http://localhost:8000/api", // have error 8000
});

// แนบ Token จาก localStorage ใน Header ทุกครั้งที่เรียกใช้งาน API
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearere ${token}`;
    };

    return req;
});

export default API;