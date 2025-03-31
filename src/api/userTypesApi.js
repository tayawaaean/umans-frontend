import axiosInstance from './axiosInstance';


const userTypesApi = {
    addUserType: (newType) => axiosInstance.post("/type", newType),
    getUserTypes: () => axiosInstance.get("/type"),
    updateApp: (id, data) => axiosInstance.put(`/type/${id}`, data),
    deleteApp: (id) => axiosInstance.delete(`/type/${id}`),
  };


export default userTypesApi;
// Look for the async slice functions to /src/store/slices/usersSlice.js