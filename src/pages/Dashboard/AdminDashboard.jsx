import React from "react";
import { Container, Typography, Box } from "@mui/material";

const AdminDashboard = () => {
  return (
    <Box sx={{ mt: 8 }}> {/* Adds margin so content is not hidden behind navbar */}
      <Container>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1">
          Welcome to the admin dashboard.
        </Typography>
      </Container>
    </Box>
  );
};

export default AdminDashboard;