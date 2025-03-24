import axiosInstance from './axiosInstance';


const authApi = {
    login: (credentials) => axiosInstance.post("/auth/superLogin", credentials),
    logout: () => axiosInstance.post("/auth/logout"),
    refreshToken: (user) => axiosInstance.post("/auth/refresh", user),
    isAuthenticated: () => axiosInstance.get("/auth/isAuthenticated"),
    getGoogleLoginUrl: () => axiosInstance.get("/auth/google/url"),
  };


export default authApi;
// Look for the async slice functions to /src/store/slices/authSlice.js