import axios from "axios";
import { NotificationError } from "../common/components/Notification";
import { requestLogout } from "../store/auth/actions";
const http = axios.create({
  // baseURL: "http://18.139.84.167:8890",
  baseURL: "http://localhost:8890",
  timeout: 60000,
});
export const interceptors = (store) => {
  http.interceptors.request.use(
    function (config) {
      console.log();
      let token = store.getState()?.auth?.token;
      config.headers.Authorization = `Bearer ${token}`;
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
      if (error.response.data.status === 403) {
        store.dispatch(requestLogout());
      }
      return Promise.reject(error.response.data.message);
    }
  );
};

export default http;
