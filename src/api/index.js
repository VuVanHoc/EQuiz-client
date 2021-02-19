import axios from "axios";
import { NotificationError } from "../common/components/Notification";
const http = axios.create({
  // baseURL: "http://18.139.84.167:8890",
  baseURL: "http://localhost:8890",
});

http.interceptors.request.use(
  function (config) {
    let accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      accessToken = localStorage.getItem("accessToken");
    }
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response?.data?.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default http;
