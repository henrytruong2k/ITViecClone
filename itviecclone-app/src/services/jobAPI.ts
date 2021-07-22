import axiosClient from "./axiosClient";

const jobAPI = {
  getAll(params?: object) {
    const url = "";
    return axiosClient.get(url, { params });
  },
  getCategories(params?: object) {
    const url = "/categories";
    return axiosClient.get(url, { params });
  },
};

export default jobAPI;
