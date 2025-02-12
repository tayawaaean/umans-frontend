import React from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";


const drawerWidth = 240; // Width of the sidebar

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
        <Sidebar />

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, ml: `${drawerWidth}px`, width: `calc(100% - ${drawerWidth}px)` }}>
        {/* Navbar */}
        <Navbar />
        
        {/* Page Content */}
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;