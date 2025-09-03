import React,{ useEffect, useRef } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { validateTokens } from '../../store/slices/authSlice';
import LoadingScreen from '../LoadingScreen';

const ProtectedRoute = ({ children, allowedRoles  }) => {
  const dispatch = useDispatch();
  const hasValidated = useRef(false);
  const { user, isAuthenticated, loading, accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    // Only validate tokens if we don't have a valid token and haven't validated yet
    if (!hasValidated.current && !accessToken) {
      dispatch(validateTokens());
      hasValidated.current = true;
    } else if (accessToken) {
      // If we have a token, mark as validated to avoid unnecessary API calls
      hasValidated.current = true;
    }
  }, [dispatch, accessToken]);
  
  // Show loading while validating tokens (only if we don't have a token)
  if (loading && !accessToken && !hasValidated.current) {
    return <LoadingScreen caption="Verifying authentication..." />;
  }
  
  //redirect if user is not authenticated
  if (!isAuthenticated){
    return <Navigate to="/login" replace />
  }
  //redirect if roles are not ok
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />
};

export default ProtectedRoute;