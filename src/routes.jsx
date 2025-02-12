import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import AdminLayout from "./layouts/AdminLayout";
import Login from "./pages/Auth/Login";
import SignIn from './pages/Auth/SignIn'
import ProtectedRoute from "./components/ProtectedRoute"; // Protect routes
import Paperbase from "./components/Paperbase";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* */}
        <Route path="/login" element={<SignIn />} />
        
        {/* */}
        <Route path = "/" element={
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            {/*<AdminLayout><AdminDashboard /></AdminLayout>*/}
            <Paperbase />
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