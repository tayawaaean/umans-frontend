import React from "react";
import { BrowserRouter as Router, Routes, Route, UNSAFE_createBrowserHistory } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import SignIn from './pages/Auth/SignIn'
import SignUp from "./pages/Auth/SignUp";
import ProtectedRoute from "./components/headers/ProtectedRoute"; // Protect routes
import Users from "./pages/Dashboard/Users";
import Apps from "./pages/Dashboard/Apps";
import UserTypes from "./pages/Dashboard/UserTypes";
import Roles from "./pages/Dashboard/Roles";
import Sessions from "./pages/Dashboard/Sessions";
import Logs from "./pages/Dashboard/Logs";

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
            <Route path = "/roles" element={<Roles />}/>
            <Route path = "/userTypes" element={<UserTypes />}/>
            <Route path = "/googleAccounts" element={<Users />}/>
            <Route path = "/sessions" element={<Sessions />}/>
            <Route path = "/about" element={<SignIn />}/>
            <Route path = "/logs" element={<Logs />}/>
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