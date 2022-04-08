import axios from "axios";
require("dotenv").config();

const { REACT_APP_API_URL } = process.env;

const axiosInstance = axios.create({ baseURL: REACT_APP_API_URL });

export default axiosInstance;
