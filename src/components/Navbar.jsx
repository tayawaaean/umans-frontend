import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: 1201 }}> {/* Ensures it appears above the sidebar */}
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          User Management System
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;