import axiosInstance from './axiosInstance';


const sessionsApi={
    getSessions: () => axiosInstance.get("/sessions"),
    deleteSession: (id) => axiosInstance.delete(`/sessions/${id}`),
  };


export default sessionsApi
// Look for the async slice functions to /src/store/slices/usersSlice.js