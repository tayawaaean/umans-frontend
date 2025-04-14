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
import About from "./pages/Dashboard/About";
import Contact from "./pages/Dashboard/Contact";
import NotFound from "./pages/Dashboard/NotFound";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Dashboard/Profile";
import PasswordReset from "./pages/Dashboard/PasswordReset";

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
            <Route path = "/" element={<Dashboard />} />
            <Route path = "/users" element={<Users />}/>
            <Route path = "/apps" element={<Apps />}/>
            <Route path = "/roles" element={<Roles />}/>
            <Route path = "/userTypes" element={<UserTypes />}/>
            <Route path = "/googleAccounts" element={<Users />}/>
            <Route path = "/sessions" element={<Sessions />}/>
            <Route path = "/about" element={<About />}/>
            <Route path = "/contact" element={<Contact />}/>
            <Route path = "/logs" element={<Logs />}/>
            <Route path = "/profile" element={<Profile />}/>
          </Route>
        </Route>
        {/* insert other routes here*/}

        {/* password reset route */}
        <Route path="/reset-password/:token" element={<PasswordReset />} />

        {/* Catch All other routes */}
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;