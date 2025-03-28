import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appsApi from "../../api/appsApi";

// Async action to handle getting apps
export const getApps = createAsyncThunk("apps/getApps", async (_, { rejectWithValue }) => {
  try {
      const response = await appsApi.getApps();
      console.log("from slice: ",response.data)
      return response.data; // Expecting { accessToken, user }
  } catch (error) {
      if(error.response.data.errors){
          const eachError = error.response.data.errors.map(err => err.msg).join(", ")
          return rejectWithValue(eachError || "Getting apps failed");
      }
      return rejectWithValue(error.response?.data?.msg || "Getting apps failed");
  }
});

// Async action to handle getting apps
export const createApp = createAsyncThunk("auth/addApp", async (newApp, { rejectWithValue }) => {
  try {
      const response = await appsApi.createApp(newApp);
      return response.data; // Expecting { accessToken, user }
  } catch (error) {
      if(error.response.data.errors){
        const eachError = error.response.data.errors.map(err => err.msg).join(", ")
        return rejectWithValue(eachError || "Signup failed");
      }
      return rejectWithValue(error.response?.data?.msg || "Something went wrong");
  }
});

// Async action to handle getting apps
export const updateApp = createAsyncThunk("apps/updateApp", async ({id, data}, { rejectWithValue }) => {
  try {
      const response = await appsApi.updateApp(id, data);
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
  apps:  ['empty'],
  loading: false,
  error: null,
  message: null,
  snackbar: { open: false, message: "", severity: "info" }, // Snackbar state
};

const appsSlice = createSlice({
  name: "apps",
  initialState,
  reducers: {
    closeSnackbar: (state) => {
      state.snackbar.open = false;
    },
  },
  extraReducers: (builder) => {
      builder
          .addCase(getApps.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
          })
          .addCase(getApps.fulfilled, (state, action) => {
            state.apps = action.payload;
            state.loading = false;
            state.snackbar = { open: true, message: "User loaded successfully!", severity: "success" };
            state.message = "apps loaded successfully";
          })
          .addCase(getApps.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.snackbar = { open: true, message: "Error on loading apps!", severity: "error" };
          })
          .addCase(createApp.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
          })
          .addCase(createApp.fulfilled, (state, action) => {
            state.loading = false;
            state.apps.push(action.payload);
            state.snackbar = { open: true, message: `${action.payload.name} was added successfully`, severity: "success" };
          })
          .addCase(createApp.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(updateApp.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
          })
          .addCase(updateApp.fulfilled, (state, action) => {
            state.loading = false;
            state.apps = state.apps.map((user) =>
              user.id === action.payload.id ? action.payload : user
            );
            state.snackbar = { open: true, message: "User was updated successfully!", severity: "success" };
          })
          .addCase(updateApp.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.snackbar = { open: true, message: "Something went wrong updating the user!", severity: "success" };
          })
  },
});
export const { closeSnackbar } = appsSlice.actions;
export default appsSlice.reducer;