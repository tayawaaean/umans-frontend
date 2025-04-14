import axiosInstance from './axiosInstance';


const usersApi = {
    createUser: (newUser) => axiosInstance.post("/auth/register", newUser),
    getUsers: () => axiosInstance.get("/users/"),
    getUserbyEmail: (email) => axiosInstance.get("/users/",email),
    updateUser: (id, data) => axiosInstance.put(`/users/${id}`, data),
    changePassword: (id, data) => axiosInstance.put(`/users/passwd-change/${id}`, data),
    deleteUser: (id) => axiosInstance.delete("/users/",id),
  };


export default usersApi;
// Look for the async slice functions to /src/store/slices/usersSlice.js