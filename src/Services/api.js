import axios from "axios";

const api = axios.create({
    baseUrl:'http://localhost:8001'
});

export default api;

