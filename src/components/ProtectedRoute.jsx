import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles  }) => {
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