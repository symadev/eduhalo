import axios from "axios";

const UseAxiosSecure = () => {
  const axiosSecure = axios.create({
    baseURL: "http://localhost:4000",
  });

  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};
export default UseAxiosSecure;