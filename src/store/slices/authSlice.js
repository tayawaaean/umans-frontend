import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";

// Async action to handle login
export const login = createAsyncThunk("auth/superLogin", async (credentials, { rejectWithValue }) => {
    try {
        const response = await authApi.login(credentials);
        console.log(response)
        return response.data; // Expecting { accessToken, user }
    } catch (error) {
        return rejectWithValue(error.response || "Login failed");
    }
});
  
// Async action to handle logout
export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
        await authApi.logout();
        return null;
    } catch (error) {
        return rejectWithValue(error.response || "Logout failed");
}
});

// Async thunk for refreshing token
export const refreshAccessToken = createAsyncThunk("auth/refresh", async (_, { rejectWithValue }) => {
    try {
        const response = await authApi.refreshToken()
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data || "Token refresh failed");
    }
});


const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  accessToken: localStorage.getItem("accessToken") || null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem("accessToken")
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.token.accessToken;
                state.isAuthenticated = true;
                localStorage.setItem("user", JSON.stringify(action.payload.user));
                localStorage.setItem("accessToken", action.payload.token.accessToken)
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(refreshAccessToken.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken;
                state.isAuthenticated = true;
            })
            .addCase(refreshAccessToken.rejected, (state) => {
                state.accessToken = null;
                state.isAuthenticated = false;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.accessToken = null;
                state.loading = false
                state.error = null;
                state.isAuthenticated = false;
                localStorage.removeItem("user");
                localStorage.removeItem("accessToken")
            });
    },
});

export default authSlice.reducer;