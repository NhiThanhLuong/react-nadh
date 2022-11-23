import axiosClient from "./axios";

// Get

export const getCandidates = async params => {
  return await axiosClient.get("/api/candidates", params);
};

export const getClients = async params => {
  return await axiosClient.get("/api/clients", params);
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

export const getDetailCandidate = async id => {
  return await axiosClient.get(`/api/candidates/${id}`);
};

export const getCurrencies = async params => {
  return await axiosClient.get("/api/exchange_currencies", params);
};

export const getFile = async params => {
  return await axiosClient.get("/nadh-mediafile/files", params);
};

export const getUsers = async params => {
  return await axiosClient.get("/api/users", params);
};

export const getDetailClient = async id => {
  return await axiosClient.get(`/api/clients/${id}`);
};

// Delete
export const deleteCandidateHistories = async id =>
  await axiosClient.delete(`/api/candidate_histories/${id}`);

export const deleteFile = async id =>
  await axiosClient.delete(`/nadh-mediafile/file/${id}`);

// Post
export const postCandidate = async params => {
  return await axiosClient.post("/api/candidates", params);
};

export const postPropertyValues = async params => {
  return await axiosClient.post(`/api/property_values`, params);
};

export const testLogin = async (username, password) => {
  return await axiosClient.post("/login", {
    user_name: username,
    password,
  });
};

export const postCandidateHistories = async params => {
  return await axiosClient.post("/api/candidate_histories", params);
};

export const postFile = async formData => {
  return await axiosClient.post("/nadh-mediafile/file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Put
export const putDetailCandidate = async (id, params) => {
  return await axiosClient.put(`/api/candidates/${id}`, params);
};

export const putCandidateHistories = async (id, params) =>
  await axiosClient.put(`/api/candidate_histories/${id}`, params);

export const putDetailClient = async (id, params) => {
  return await axiosClient.put(`/api/clients/${id}`, params);
};

export const putDetailClientTax = async (id, tax_code) => {
  return await axiosClient.put(`/api/clients/${id}/tax`, { tax_code });
};
