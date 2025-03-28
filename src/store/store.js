import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import usersReducer from './slices/usersSlice';
import appsReducer from './slices/appsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    apps: appsReducer,
  },
});

export default store;