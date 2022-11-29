import axios from "axios";
import queryString from "query-string";
import { storage } from "_constants";

const axiosClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "https://lubrytics.com:8443/nadh-api-crm",
});

axiosClient.interceptors.request.use(async config => {
  if (config.url.includes("nadh-mediafile"))
    config.baseURL = "https://lubrytics.com:8443";
  config.paramsSerializer = params => queryString.stringify(params);
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  error => {
    console.log(error.response.data.message);
    if (
      error.response.data.message === "Invalid tokenForbiddenError: Forbidden"
    ) {
      localStorage.removeItem(storage.token);
      localStorage.removeItem(storage.user_sent);
      window.location.reload();
    }
    throw error;
  }
);

export default axiosClient;
