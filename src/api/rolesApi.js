import axiosInstance from './axiosInstance';


const rolesApi = {
    addRole: (newRole) => axiosInstance.post("/roles", newRole),
    getRoles: () => axiosInstance.get("/roles"),
    updateRole: (id, data) => axiosInstance.put(`/roles/${id}`, data),
    deleteApp: (id) => axiosInstance.delete(`/roles/${id}`),
  };


export default rolesApi;
// Look for the async slice functions to /src/store/slices/usersSlice.js