import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import SignIn from './pages/Auth/SignIn'
import SignUp from "./pages/Auth/SignUp";
import ProtectedRoute from "./components/headers/ProtectedRoute"; // Protect routes
import AdminDashboard from "./pages/Dashboard/AdminDashboard";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* */}
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />

        {/* */}
        <Route path = "/" element={
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <AdminLayout><AdminDashboard /></AdminLayout>
          </ProtectedRoute>}>
        </Route>
        {/* insert other routes here*/}

        {/* Catch All other routes */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;