import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import AdminLayout from "./layouts/AdminLayout";
import Login from "./pages/Auth/Login";
import ProtectedRoute from "./components/ProtectedRoute"; // Protect routes


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* */}
        <Route path="/login" element={<Login />} />
        
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