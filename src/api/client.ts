import axios from "axios";
import axiosRetry from "axios-retry";

export const apiClient = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosRetry(apiClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return (
      error.response?.status === 408 ||
      error.response?.status === 429 ||
      error.response?.status! >= 500 ||
      error.code === "ECONNABORTED" ||
      error.message === "Network Error"
    );
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle 401 globally, optionally handle refresh token
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/"
      ) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error.response?.data || error);
  },
);

// synced
