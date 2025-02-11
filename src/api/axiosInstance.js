import axios from 'axios';
import { store } from "../store/store";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:5000/api/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach access token
axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const accessToken = state.auth.accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Interceptor to refresh token on 401 (Unauthorized)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("responding to 401:", error.response.data)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        //const { store } = await import("../store/store")
        await store.dispatch(refreshAccessToken()).unwrap();
        originalRequest.headers["Authorization"] = `Bearer ${store.getState().auth.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        store.dispatch(logout());
        window.location.href = "/login"; // Redirect to login on refresh failure
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;