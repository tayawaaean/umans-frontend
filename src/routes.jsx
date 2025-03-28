import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import SignIn from './pages/Auth/SignIn'
import SignUp from "./pages/Auth/SignUp";
import ProtectedRoute from "./components/headers/ProtectedRoute"; // Protect routes
import Users from "./pages/Dashboard/Users";
import Apps from "./pages/Dashboard/Apps";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* */}
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />

        {/* */}
        <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
          <Route element={<AdminLayout />}>
            <Route path = "/" element={<Users />}/>
            <Route path = "/apps" element={<Apps />}/>
            <Route path = "/roles" element={<Users />}/>
            <Route path = "/usertypes" element={<Users />}/>
            <Route path = "/googleaccounts" element={<Users />}/>
            <Route path = "/sessions" element={<Users />}/>
            <Route path = "/about" element={<SignIn />}/>
          </Route>
        </Route>
        {/* insert other routes here*/}

        {/* Catch All other routes */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;