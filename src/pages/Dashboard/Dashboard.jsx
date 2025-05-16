import React, { useState } from "react";
import { Box, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";

// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();

  // Dummy data for the stats
  const [userCount] = useState(1200); // Dummy user count
  const [appCount] = useState(50); // Dummy app count
  const [roleCount] = useState(5); // Dummy role count
  const [userTypeCount] = useState(4); // Dummy user type count

  // Dummy data for the graph
  const [userStats] = useState([
    { name: "Jan", users: 4000 },
    { name: "Feb", users: 3000 },
    { name: "Mar", users: 5000 },
    { name: "Apr", users: 7000 },
    { name: "May", users: 9000 },
    { name: "Jun", users: 12000 },
  ]);

  // Dummy data for app usage
  const [appStats] = useState([
    { name: "Jan", apps: 200 },
    { name: "Feb", apps: 180 },
    { name: "Mar", apps: 220 },
    { name: "Apr", apps: 250 },
    { name: "May", apps: 300 },
    { name: "Jun", apps: 350 },
  ]);

  // Chart data setup for User Growth
  const userGrowthData = {
    labels: userStats.map(stat => stat.name),
    datasets: [
      {
        label: "User Growth",
        data: userStats.map(stat => stat.users),
        borderColor: "#4caf50", // Green color
        backgroundColor: "rgba(76, 175, 80, 0.1)",
        tension: 0.3,
      },
    ],
  };

  // Chart data setup for App Usage
  const appUsageData = {
    labels: appStats.map(stat => stat.name),
    datasets: [
      {
        label: "App Usage",
        data: appStats.map(stat => stat.apps),
        borderColor: "#1976d2", // Blue color
        backgroundColor: "rgba(25, 118, 210, 0.1)",
        tension: 0.3,
      },
    ],
  };

  const navigateToPage = (page) => {
    navigate(page);
  };

  return (
    <Box sx={{ padding: 3,  minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3}}>
        Dashboard Overview
      </Typography>

      {/* Stats Overview */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card sx={{  boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" >Total Users</Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1976d2" }}>{userCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{  boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" >Total Apps</Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#4caf50" }}>{appCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{  boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" >Total Roles</Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#f44336" }}>{roleCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{  boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" >Total User Types</Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#ff9800" }}>{userTypeCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Graph Section */}
      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3,  height: "100%" }}>
            <CardContent sx={{ height: "100%" }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
                Users Growth Over Time
              </Typography>
              <Box sx={{ height: '100%', width: '100%' }}>
                <Line data={userGrowthData} options={{ responsive: true, maintainAspectRatio: true }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3,  height: "100%" }}>
            <CardContent sx={{ height: "100%" }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
                App Usage Over Time
              </Typography>
              <Box sx={{ height: '100%', width: '100%' }}>
                <Line data={appUsageData} options={{ responsive: true, maintainAspectRatio: true }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Shortcuts Section */}
      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, backgroundColor: "#ffffff" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold"}}>Add New User</Typography>
              <Button onClick={() => navigateToPage("/users")} variant="contained" fullWidth sx={{ background: "#1976d2", color: "white", "&:hover": { backgroundColor: "#1565c0" } }}>
                Go to Add User
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, backgroundColor: "#ffffff" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold"}}>Manage Roles</Typography>
              <Button onClick={() => navigateToPage("/roles")} variant="contained" fullWidth sx={{ background: "#f44336", color: "white", "&:hover": { backgroundColor: "#e53935" } }}>
                Go to Roles
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, backgroundColor: "#ffffff" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold"}}>Manage Apps</Typography>
              <Button onClick={() => navigateToPage("/apps")} variant="contained" fullWidth sx={{ background: "#4caf50", color: "white", "&:hover": { backgroundColor: "#388e3c" } }}>
                Go to Apps
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
