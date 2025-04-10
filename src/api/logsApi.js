import axiosInstance from './axiosInstance';


export const getLogs = async (limit = 50) => {
    const response = await axiosInstance.get('/logs', {
      params: { limit }, // attaches ?limit=50 to the URL
    });
    return response.data;
  };
