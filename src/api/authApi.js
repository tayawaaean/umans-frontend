import axiosInstance from './axiosInstance';

export const login = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await axiosInstance.post('/auth/register', userData);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response.data;
};

const authApi = {
    login: (credentials) => axiosInstance.post("/auth/superLogin", credentials),
    logout: () => axiosInstance.post("/auth/logout"),
    refreshToken: (user) => axiosInstance.post("/auth/refresh", user),
    isAuthenticated: () => axiosInstance.get("/auth/isAuthenticated"),
  };

export default authApi;