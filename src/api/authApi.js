import axiosInstance from './axiosInstance';


const authApi = {
    login: (credentials) => axiosInstance.post("/auth/superLogin", credentials),
    logout: () => axiosInstance.post("/auth/logout"),
    refreshToken: (user) => axiosInstance.post("/auth/refresh", user),
    isAuthenticated: () => axiosInstance.get("/auth/isAuthenticated"),
    getGoogleLoginUrl: () => axiosInstance.get("/auth/google/url"),
  };

export const googleApi = {
  getGoogleLoginUrl: async () => {
    const response = await axiosInstance.get("/auth/google/url")
    return response.data.url
  },
  callback: (code) => axiosInstance.get("/auth/google/callback", code),
  loginGoogleUser: (userInfo) => {
    axiosInstance.post("/auth/google/regislog", userInfo)
  }
};

export default authApi;