import axiosClient from "./axios";

export const testLogin = async (username, password) => {
  return await axiosClient.post("/login", {
    user_name: username,
    password,
  });
};

export const postCandidate = async params => {
  return await axiosClient.post("/api/candidates", params);
};

export const getCandidates = async params => {
  return await axiosClient.get("/api/candidates", params);
};

export const getUserPage = async params => {
  return await axiosClient.get("/api/user_pages", params);
};

export const getLocations = async params => {
  return await axiosClient.get("/api/locations", params);
};

export const getCategories = async params => {
  return await axiosClient.get("/api/categories", params);
};

export const getPropertyValues = async params => {
  return await axiosClient.get("/api/property_values", params);
};

export const postPropertyNationality = async value => {
  return await axiosClient.post(`/api/property_values`, {
    name: "nationality",
    value,
  });
};

export const postPropertyPosition = async value => {
  return await axiosClient.post(`/api/property_values`, {
    name: "position",
    value,
  });
};

export const getDetailCandidate = async id => {
  return await axiosClient.get(`/api/candidates/${id}`);
};

export const putDetailCandidate = async (id, params) => {
  return await axiosClient.put(`/api/candidates/${id}`, params);
};
