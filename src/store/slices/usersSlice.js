import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersApi from "../../api/usersApi";

// Async action to handle getting users
export const getUsers = createAsyncThunk("users", async (_, { rejectWithValue }) => {
  try {
      const response = await usersApi.getUsers();
      console.log("from slice: ",response.data)
      return response.data; // Expecting { accessToken, user }
  } catch (error) {
      if(error.response.data.errors){
          const eachError = error.response.data.errors.map(err => err.msg).join(", ")
          return rejectWithValue(eachError || "Getting users failed");
      }
      return rejectWithValue(error.response?.data?.msg || "Getting users failed");
  }
});

// Async action to handle getting users
export const createUser = createAsyncThunk("auth/register", async (newUser, { rejectWithValue }) => {
  try {
      const response = await usersApi.createUser(newUser);
      return response.data; // Expecting { accessToken, user }
  } catch (error) {
      if(error.response.data.errors){
        const eachError = error.response.data.errors.map(err => err.msg).join(", ")
        return rejectWithValue(eachError || "Signup failed");
      }
      return rejectWithValue(error.response?.data?.msg || "Something went wrong");
  }
});

const initialState = {
  users:  ['empty'],
  admins: ['empty'],
  types: ['empty'],
  loading: false,
  error: null,
  message: null
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder
          .addCase(getUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.loading = false;
          })
          .addCase(getUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(createUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
          })
          .addCase(createUser.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
          })
          .addCase(createUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
  },
});

export default usersSlice.reducer;