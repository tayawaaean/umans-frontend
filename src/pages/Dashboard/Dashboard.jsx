import React, { useState } from "react";
import { 
  Box, Grid, Card, CardContent, Typography, Button, Chip, 
  Stack, IconButton, Avatar, LinearProgress, Divider 
} from "@mui/material";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { useNavigate } from "react-router-dom";
import { styled, keyframes } from '@mui/material/styles';
import { 
  People, Apps, Security, Category, TrendingUp, TrendingDown,
  Add, Settings, ArrowForward, MoreVert, Refresh
} from '@mui/icons-material';

// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

// Subtle animations - only for hover effects
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

// Three-color rule: Primary (Blue), Neutral (Gray), Accent (Green)
const DashboardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  minHeight: '100vh',
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.background.default} 100%)`
    : `linear-gradient(135deg, ${theme.palette.grey[900]} 0%, ${theme.palette.background.default} 100%)`,
}));

const PageHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '2.5rem',
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
    : `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(1),
}));

const PageSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '1.1rem',
  fontWeight: 500,
}));

const StatsCard = styled(Card)(({ theme, color }) => ({
  borderRadius: '20px',
  minHeight: '200px',
  [theme.breakpoints.down('md')]: {
    minHeight: '180px',
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: '160px',
  },
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`
    : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[900]} 100%)`,
  border: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]}`,
  boxShadow: theme.palette.mode === 'light'
    ? '0 8px 32px rgba(0, 0, 0, 0.1)'
    : '0 8px 32px rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(20px)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, ${color}20, transparent)`,
    animation: `${shimmer} 2s infinite`,
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.palette.mode === 'light'
      ? `0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px ${color}30`
      : `0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px ${color}30`,
  },
}));

const StatsIcon = styled(Avatar)(({ theme, bgcolor }) => ({
  width: 60,
  height: 60,
  background: bgcolor,
  boxShadow: `0 8px 24px ${bgcolor}40`,
  animation: `${pulse} 2s infinite`,
}));

const StatsValue = styled(Typography)(({ theme, color }) => ({
  fontWeight: 800,
  fontSize: '2.5rem',
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${color}, ${color}CC)`
    : `linear-gradient(135deg, ${color}CC, ${color})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  lineHeight: 1,
}));

const ChartCard = styled(Card)(({ theme }) => ({
  borderRadius: '20px',
  minHeight: '400px',
  [theme.breakpoints.down('md')]: {
    minHeight: '350px',
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: '300px',
  },
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`
    : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[900]} 100%)`,
  border: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]}`,
  boxShadow: theme.palette.mode === 'light'
    ? '0 8px 32px rgba(0, 0, 0, 0.1)'
    : '0 8px 32px rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(20px)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'light'
      ? '0 16px 48px rgba(0, 0, 0, 0.15)'
      : '0 16px 48px rgba(0, 0, 0, 0.4)',
  },
}));

const ChartHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(3),
  padding: theme.spacing(0, 1),
}));

const ChartTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.3rem',
  color: theme.palette.text.primary,
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  borderRadius: '12px',
  padding: theme.spacing(1),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light'
      ? `${theme.palette.primary.main}15`
      : `${theme.palette.primary.main}25`,
    transform: 'scale(1.1)',
  },
}));

const ShortcutCard = styled(Card)(({ theme, color }) => ({
  borderRadius: '20px',
  minHeight: '220px',
  [theme.breakpoints.down('md')]: {
    minHeight: '200px',
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: '180px',
  },
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`
    : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[900]} 100%)`,
  border: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]}`,
  boxShadow: theme.palette.mode === 'light'
    ? '0 8px 32px rgba(0, 0, 0, 0.1)'
    : '0 8px 32px rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(20px)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.palette.mode === 'light'
      ? `0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px ${color}30`
      : `0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px ${color}30`,
  },
}));

const ShortcutButton = styled(Button)(({ theme, color }) => ({
  borderRadius: '16px',
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
  fontSize: '1rem',
  textTransform: 'none',
  background: `linear-gradient(135deg, ${color}, ${color}CC)`,
  boxShadow: `0 4px 16px ${color}40`,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: `linear-gradient(135deg, ${color}CC, ${color})`,
    boxShadow: `0 8px 24px ${color}60`,
    transform: 'translateY(-2px)',
  },
}));

const Dashboard = () => {
  const navigate = useNavigate();

  // Enhanced dummy data for the stats with growth indicators
  const [statsData] = useState({
    users: { count: 1200, growth: 12.5, trend: 'up' },
    apps: { count: 50, growth: 8.3, trend: 'up' },
    roles: { count: 5, growth: 0, trend: 'stable' },
    userTypes: { count: 4, growth: -2.1, trend: 'down' }
  });

  // Enhanced dummy data for the graph
  const [userStats] = useState([
    { name: "Jan", users: 4000, apps: 200 },
    { name: "Feb", users: 3000, apps: 180 },
    { name: "Mar", users: 5000, apps: 220 },
    { name: "Apr", users: 7000, apps: 250 },
    { name: "May", users: 9000, apps: 300 },
    { name: "Jun", users: 12000, apps: 350 },
  ]);

  // Recent activity data
  const [recentActivity] = useState([
    { id: 1, type: 'user', action: 'New user registered', time: '2 minutes ago', user: 'John Doe' },
    { id: 2, type: 'app', action: 'App updated', time: '15 minutes ago', user: 'Jane Smith' },
    { id: 3, type: 'role', action: 'Role assigned', time: '1 hour ago', user: 'Mike Johnson' },
    { id: 4, type: 'user', action: 'Profile updated', time: '2 hours ago', user: 'Sarah Wilson' },
  ]);

  // Enhanced chart data setup for User Growth
  const userGrowthData = {
    labels: userStats.map(stat => stat.name),
    datasets: [
      {
        label: "User Growth",
        data: userStats.map(stat => stat.users),
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.1)",
        borderWidth: 3,
        pointBackgroundColor: "#4caf50",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Enhanced chart data setup for App Usage
  const appUsageData = {
    labels: userStats.map(stat => stat.name),
    datasets: [
      {
        label: "App Usage",
        data: userStats.map(stat => stat.apps),
        borderColor: "#1976d2",
        backgroundColor: "rgba(25, 118, 210, 0.1)",
        borderWidth: 3,
        pointBackgroundColor: "#1976d2",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Doughnut chart data for user distribution
  const userDistributionData = {
    labels: ['Active Users', 'Inactive Users', 'Pending Users'],
    datasets: [
      {
        data: [850, 250, 100],
        backgroundColor: [
          'rgba(76, 175, 80, 0.8)',
          'rgba(255, 152, 0, 0.8)',
          'rgba(156, 39, 176, 0.8)',
        ],
        borderColor: [
          'rgba(76, 175, 80, 1)',
          'rgba(255, 152, 0, 1)',
          'rgba(156, 39, 176, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
      },
    },
  };

  const navigateToPage = (page) => {
    navigate(page);
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp sx={{ color: '#4caf50' }} />;
      case 'down': return <TrendingDown sx={{ color: '#f44336' }} />;
      default: return <TrendingUp sx={{ color: '#9e9e9e' }} />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return '#4caf50';
      case 'down': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  return (
    <DashboardContainer>
      <PageHeader>
        <PageTitle>Dashboard Overview</PageTitle>
        <PageSubtitle>Welcome back! Here's what's happening with your system today.</PageSubtitle>
      </PageHeader>

      {/* Enhanced Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard color="#1976d2" >
            <CardContent sx={{ p: 3.5 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <StatsIcon bgcolor="linear-gradient(135deg, #1976d2, #1565c0)">
                  <People />
                </StatsIcon>
                <Chip 
                  icon={getTrendIcon(statsData.users.trend)}
                  label={`${statsData.users.growth}%`}
                  size="small"
                  sx={{ 
                    backgroundColor: `${getTrendColor(statsData.users.trend)}20`,
                    color: getTrendColor(statsData.users.trend),
                    fontWeight: 600
                  }}
                />
              </Stack>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                Total Users
              </Typography>
              <StatsValue color="#1976d2">{statsData.users.count.toLocaleString()}</StatsValue>
            </CardContent>
          </StatsCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatsCard color="#4caf50" >
            <CardContent sx={{ p: 3.5 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <StatsIcon bgcolor="linear-gradient(135deg, #4caf50, #388e3c)">
                  <Apps />
                </StatsIcon>
                <Chip 
                  icon={getTrendIcon(statsData.apps.trend)}
                  label={`${statsData.apps.growth}%`}
                  size="small"
                  sx={{ 
                    backgroundColor: `${getTrendColor(statsData.apps.trend)}20`,
                    color: getTrendColor(statsData.apps.trend),
                    fontWeight: 600
                  }}
                />
              </Stack>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                Total Apps
              </Typography>
              <StatsValue color="#4caf50">{statsData.apps.count}</StatsValue>
            </CardContent>
          </StatsCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatsCard color="#f44336" >
            <CardContent sx={{ p: 3.5 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <StatsIcon bgcolor="linear-gradient(135deg, #f44336, #d32f2f)">
                  <Security />
                </StatsIcon>
                <Chip 
                  icon={getTrendIcon(statsData.roles.trend)}
                  label={`${statsData.roles.growth}%`}
                  size="small"
                  sx={{ 
                    backgroundColor: `${getTrendColor(statsData.roles.trend)}20`,
                    color: getTrendColor(statsData.roles.trend),
                    fontWeight: 600
                  }}
                />
              </Stack>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                Total Roles
              </Typography>
              <StatsValue color="#f44336">{statsData.roles.count}</StatsValue>
            </CardContent>
          </StatsCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatsCard color="#ff9800" >
            <CardContent sx={{ p: 3.5 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <StatsIcon bgcolor="linear-gradient(135deg, #ff9800, #f57c00)">
                  <Category />
                </StatsIcon>
                <Chip 
                  icon={getTrendIcon(statsData.userTypes.trend)}
                  label={`${statsData.userTypes.growth}%`}
                  size="small"
                  sx={{ 
                    backgroundColor: `${getTrendColor(statsData.userTypes.trend)}20`,
                    color: getTrendColor(statsData.userTypes.trend),
                    fontWeight: 600
                  }}
                />
              </Stack>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                User Types
              </Typography>
              <StatsValue color="#ff9800">{statsData.userTypes.count}</StatsValue>
            </CardContent>
          </StatsCard>
        </Grid>
      </Grid>

      {/* Enhanced Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <ChartCard >
            <CardContent sx={{ p: 3.5 }}>
              <ChartHeader>
                <ChartTitle>User Growth Analytics</ChartTitle>
                <Stack direction="row" spacing={1}>
                  <ActionButton size="small">
                    <Refresh />
                  </ActionButton>
                  <ActionButton size="small">
                    <MoreVert />
                  </ActionButton>
                </Stack>
              </ChartHeader>
              <Box sx={{ height: 300, width: '100%' }}>
                <Line data={userGrowthData} options={chartOptions} />
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <ChartCard >
            <CardContent sx={{ p: 3.5 }}>
              <ChartHeader>
                <ChartTitle>User Distribution</ChartTitle>
                <ActionButton size="small">
                  <MoreVert />
                </ActionButton>
              </ChartHeader>
              <Box sx={{ height: 300, width: '100%' }}>
                <Doughnut data={userDistributionData} options={doughnutOptions} />
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>
      </Grid>

      {/* App Usage Chart */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <ChartCard >
            <CardContent sx={{ p: 3.5 }}>
              <ChartHeader>
                <ChartTitle>App Usage Trends</ChartTitle>
                <Stack direction="row" spacing={1}>
                  <ActionButton size="small">
                    <Refresh />
                  </ActionButton>
                  <ActionButton size="small">
                    <MoreVert />
                  </ActionButton>
                </Stack>
              </ChartHeader>
              <Box sx={{ height: 300, width: '100%' }}>
                <Line data={appUsageData} options={chartOptions} />
              </Box>
            </CardContent>
          </ChartCard>
        </Grid>
      </Grid>

      {/* Enhanced Shortcuts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <ShortcutCard color="#1976d2" >
            <CardContent sx={{ p: 3.5 }}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <Avatar sx={{ bgcolor: 'linear-gradient(135deg, #1976d2, #1565c0)', width: 48, height: 48 }}>
                  <Add />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    Add New User
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Create and manage user accounts
                  </Typography>
                </Box>
              </Stack>
              <ShortcutButton 
                color="#1976d2" 
                fullWidth 
                onClick={() => navigateToPage("/users")}
                endIcon={<ArrowForward />}
              >
                Go to Users
              </ShortcutButton>
            </CardContent>
          </ShortcutCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <ShortcutCard color="#f44336" >
            <CardContent sx={{ p: 3.5 }}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <Avatar sx={{ bgcolor: 'linear-gradient(135deg, #f44336, #d32f2f)', width: 48, height: 48 }}>
                  <Security />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    Manage Roles
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Configure user permissions and roles
                  </Typography>
                </Box>
              </Stack>
              <ShortcutButton 
                color="#f44336" 
                fullWidth 
                onClick={() => navigateToPage("/roles")}
                endIcon={<ArrowForward />}
              >
                Go to Roles
              </ShortcutButton>
            </CardContent>
          </ShortcutCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <ShortcutCard color="#4caf50" >
            <CardContent sx={{ p: 3.5 }}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <Avatar sx={{ bgcolor: 'linear-gradient(135deg, #4caf50, #388e3c)', width: 48, height: 48 }}>
                  <Apps />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    Manage Apps
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Configure and monitor applications
                  </Typography>
                </Box>
              </Stack>
              <ShortcutButton 
                color="#4caf50" 
                fullWidth 
                onClick={() => navigateToPage("/apps")}
                endIcon={<ArrowForward />}
              >
                Go to Apps
              </ShortcutButton>
            </CardContent>
          </ShortcutCard>
        </Grid>
      </Grid>

      {/* Recent Activity Section */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ChartCard >
            <CardContent sx={{ p: 3.5 }}>
              <ChartHeader>
                <ChartTitle>Recent Activity</ChartTitle>
                <ActionButton size="small">
                  <Refresh />
                </ActionButton>
              </ChartHeader>
              <Stack spacing={2}>
                {recentActivity.map((activity, index) => (
                  <Box key={activity.id}>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ p: 2, borderRadius: 2, '&:hover': { backgroundColor: 'action.hover' } }}>
                      <Avatar sx={{ 
                        bgcolor: activity.type === 'user' ? '#1976d2' : activity.type === 'app' ? '#4caf50' : '#f44336',
                        width: 40, 
                        height: 40 
                      }}>
                        {activity.type === 'user' ? <People /> : activity.type === 'app' ? <Apps /> : <Security />}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {activity.action}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          by {activity.user}
                        </Typography>
                      </Box>
                      <Chip 
                        label={activity.time} 
                        size="small" 
                        variant="outlined"
                        sx={{ fontWeight: 500 }}
                      />
                    </Stack>
                    {index < recentActivity.length - 1 && <Divider />}
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </ChartCard>
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};

export default Dashboard;
