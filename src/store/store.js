import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import usersReducer from './slices/usersSlice';
import appsReducer from './slices/appsSlice';
import snackbarReducer from './slices/snackbarSlice';
import userTypesReducer from './slices/userTypesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    apps: appsReducer,
    snackbar: snackbarReducer,
    userTypes: userTypesReducer,
  },
});

export default store;