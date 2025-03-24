import axiosInstance from './axiosInstance';


const usersApi = {
    createUser: (newUser) => axiosInstance.post("/auth/register", newUser),
    getUsers: () => axiosInstance.get("/users/"),
    getUserbyEmail: (email) => axiosInstance.get("/users/",email),
    updateUser: (id) => axiosInstance.put("/users/", id),
    changePassword: () => axiosInstance.post("/users/passwd-change"),
    deleteUser: (id) => axiosInstance.delete("/users/",id),
  };


export default usersApi;
// Look for the async slice functions to /src/store/slices/usersSlice.js