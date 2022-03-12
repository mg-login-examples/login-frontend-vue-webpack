import axios, { AxiosInstance } from "axios";

const http: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
});

export default http;
