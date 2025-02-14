import React,{ useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { validateTokens } from '../store/slices/authSlice';

const ProtectedRoute = ({ children, allowedRoles  }) => {
  const dispatch = useDispatch();
  let once = true;

  useEffect(() => {
    if (once){
      console.log("is auth getting run at APP component")
      dispatch(validateTokens());
      once = false
    }
  }, [dispatch]);

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  console.log("protected route accessToken", isAuthenticated)
  
  //redirect if user is not authenticated
  if (!isAuthenticated){
    return <Navigate to="/login" />
  }
  //redirect if roles are not ok
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children
};

export default ProtectedRoute;