import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import SignIn from './pages/Auth/SignIn'
import ProtectedRoute from "./components/headers/ProtectedRoute"; // Protect routes
import Users from "./pages/Dashboard/Users";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoadingScreen from './components/LoadingScreen';

// Import all dashboard components directly to prevent re-mounting
import Apps from "./pages/Dashboard/Apps";
import UserTypes from "./pages/Dashboard/UserTypes";
import Roles from "./pages/Dashboard/Roles";
import Sessions from "./pages/Dashboard/Sessions";
import Logs from "./pages/Dashboard/Logs";
import About from "./pages/Dashboard/About";
import Contact from "./pages/Dashboard/Contact";
import Profile from "./pages/Dashboard/Profile";

//lazy components - only for less frequently accessed pages
const SignUp = lazy(() => import("./pages/Auth/SignUp"));
const NotFound = lazy(() => import("./pages/Dashboard/NotFound"));
const PasswordReset = lazy(() => import("./pages/Dashboard/PasswordReset"));

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* */}
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={
          <Suspense fallback={<LoadingScreen caption='Loading...' fullScreen={false} />}>
            <SignUp />
          </Suspense>
        } />

        {/* */}
        <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
          <Route element={<AdminLayout />}>
            <Route path = "/" element={<Dashboard />} />
            <Route path = "/users" element={<Users />} />
            <Route path = "/apps" element={<Apps />} />
            <Route path = "/roles" element={<Roles />} />
            <Route path = "/userTypes" element={<UserTypes />} />
            <Route path = "/googleAccounts" element={<Apps />} /> {/*change to google accounts component */}
            <Route path = "/sessions" element={<Sessions />} />
            <Route path = "/about" element={<About />} />
            <Route path = "/contact" element={<Contact />} />
            <Route path = "/logs" element={<Logs />} />
            <Route path = "/profile" element={<Profile />} />
          </Route>
        </Route>
        {/* insert other routes here*/}

        {/* password reset route */}
        <Route path="/reset-password/:token" element={
          <Suspense fallback={<LoadingScreen caption='Loading...' fullScreen={false} />}>
            <PasswordReset />
          </Suspense>
          } />

        {/* Catch All other routes */}
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;