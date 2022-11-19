import axios from "axios";
import queryString from "query-string";

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
    throw error;
  }
);

export default axiosClient;
