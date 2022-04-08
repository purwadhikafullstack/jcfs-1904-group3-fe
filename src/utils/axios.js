import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:2023" });

export default axiosInstance;
