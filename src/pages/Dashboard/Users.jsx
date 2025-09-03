import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//MUI components
import { 
  Box, Typography, Paper, Grid, Button, TextField, Tooltip, 
  IconButton, Chip, Stack, Avatar, Card, CardContent, InputAdornment,
  Fade, Zoom, Pagination
} from '@mui/material';
import { 
  Search as SearchIcon, Refresh as RefreshIcon, Add as AddIcon,
  People as PeopleIcon, FilterList as FilterIcon, Download as DownloadIcon,
  ViewList as ViewListIcon, ViewModule as ViewModuleIcon
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';


//custom Table for users
import UsersTable from "../../components/tables/UsersTable";

//functions to dispatch actions
import { getUsers, createUser } from '../../store/slices/usersSlice';

//Custom loading screen
import LoadingScreen from "../../components/LoadingScreen";

//custom dialog for adding a user
import AddUserDialog from "../../components/dialogs/AddUserDialog";

// Subtle animations - only for hover effects
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Three-color rule: Primary (Blue), Neutral (Gray), Accent (Green)
const UsersContainer = styled(Box)(({ theme }) => ({
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

const StatsCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  minHeight: '140px',
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`
    : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[900]} 100%)`,
  border: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]}`,
  boxShadow: theme.palette.mode === 'light'
    ? '0 8px 32px rgba(0, 0, 0, 0.1)'
    : '0 8px 32px rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(20px)',
  transition: 'all 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'light'
      ? '0 16px 48px rgba(0, 0, 0, 0.15)'
      : '0 16px 48px rgba(0, 0, 0, 0.4)',
  },
}));

const StatsIcon = styled(Avatar)(({ theme, bgcolor }) => ({
  width: 50,
  height: 50,
  background: bgcolor,
  boxShadow: `0 8px 24px ${bgcolor}40`,
  animation: `${pulse} 2s infinite`,
}));

const StatsValue = styled(Typography)(({ theme, color }) => ({
  fontWeight: 800,
  fontSize: '2rem',
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${color}, ${color}CC)`
    : `linear-gradient(135deg, ${color}CC, ${color})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  lineHeight: 1,
}));

const EnhancedSearch = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    backgroundColor: theme.palette.mode === 'light'
      ? `${theme.palette.grey[100]}80`
      : `${theme.palette.grey[800]}80`,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[700]}`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`,
    },
    '&.Mui-focused': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 3px ${theme.palette.primary.main}20, 0 4px 12px rgba(0,0,0,0.1)`,
    },
  },
}));

const ActionButton = styled(Button)(({ theme, variant }) => ({
  borderRadius: '12px',
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
  fontSize: '1rem',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  ...(variant === 'contained' && {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    boxShadow: `0 4px 16px ${theme.palette.primary.main}40`,
    '&:hover': {
      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
      boxShadow: `0 8px 24px ${theme.palette.primary.main}60`,
      transform: 'translateY(-2px)',
    },
  }),
  ...(variant === 'outlined' && {
    border: `2px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: `${theme.palette.primary.main}15`,
      transform: 'translateY(-2px)',
    },
  }),
}));

const TableContainer = styled(Paper)(({ theme }) => ({
  borderRadius: '20px',
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`
    : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[900]} 100%)`,
  border: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]}`,
  boxShadow: theme.palette.mode === 'light'
    ? '0 8px 32px rgba(0, 0, 0, 0.1)'
    : '0 8px 32px rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(20px)',
  overflow: 'hidden',
}));

const StyledPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    borderRadius: '12px',
    fontWeight: 600,
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      transform: 'translateY(-2px)',
      boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
    },
    '&.Mui-selected': {
      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
      color: theme.palette.primary.contrastText,
      boxShadow: `0 4px 16px ${theme.palette.primary.main}40`,
      '&:hover': {
        background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
        boxShadow: `0 6px 20px ${theme.palette.primary.main}60`,
      },
    },
  },
  '& .MuiPaginationItem-previousNext': {
    borderRadius: '12px',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      transform: 'translateY(-2px)',
    },
  },
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(3),
  borderTop: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]}`,
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.background.paper} 100%)`
    : `linear-gradient(135deg, ${theme.palette.grey[900]} 0%, ${theme.palette.background.paper} 100%)`,
}));


export default function Users() {
  const {users, loading, loadingRowId } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    if (users[0] === 'empty') {
      dispatch(getUsers());
    }
  }
  ,[users]);

  // Filter users based on firstName, lastName, or email
  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName} ${user.email} ${user.role} ${user.office} ${user.mobileNo} `
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Calculate stats
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.isActive).length;
  const adminUsers = users.filter(user => user.role === 'admin').length;
  const recentUsers = users.filter(user => {
    const userDate = new Date(user.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return userDate > weekAgo;
  }).length;

  //reload users
  const handleReload = () => {
    dispatch(getUsers());
    setSearchTerm("");  // Clear the search term
  }

  //add user dialog open close functions
  const handleOpen = () => {
    setOpen(true);
  } 
  const handleClose = () => {
    setOpen(false);
  }

  //add user function
  const handleAddUser = (userData) => {
    dispatch(createUser(userData)); // Dispatch the action to add a user
    handleClose(); // Close the dialog
  };


  return (
    <UsersContainer>
      {loading || users[0] === 'empty'? <LoadingScreen caption='Loading...' fullScreen={false} /> : (
        <>
          {/* Page Header */}
          <PageHeader>
            <PageTitle>User Management</PageTitle>
            <PageSubtitle>Manage and monitor all user accounts in your system</PageSubtitle>
          </PageHeader>

          {/* Stats Overview */}
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ mb: 4, mt: 2 }}>
            <Grid item xs={12} sm={6} lg={3}>
              <StatsCard>
                <CardContent sx={{ p: { xs: 2, sm: 3 }, pt: { xs: 1.5, sm: 2 } }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <StatsIcon bgcolor="linear-gradient(135deg, #1976d2, #1565c0)">
                      <PeopleIcon />
                    </StatsIcon>
                    <Box>
                      <Typography variant="h6" color="text.secondary" sx={{ mb: 0.5, fontWeight: 500 }}>
                        Total Users
                      </Typography>
                      <StatsValue color="#1976d2">{totalUsers}</StatsValue>
                    </Box>
                  </Stack>
                </CardContent>
              </StatsCard>
            </Grid>

            <Grid item xs={12} sm={6} lg={3}>
              <StatsCard>
                <CardContent sx={{ p: { xs: 2, sm: 3 }, pt: { xs: 1.5, sm: 2 } }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <StatsIcon bgcolor="linear-gradient(135deg, #4caf50, #388e3c)">
                      <PeopleIcon />
                    </StatsIcon>
                    <Box>
                      <Typography variant="h6" color="text.secondary" sx={{ mb: 0.5, fontWeight: 500 }}>
                        Active Users
                      </Typography>
                      <StatsValue color="#4caf50">{activeUsers}</StatsValue>
                    </Box>
                  </Stack>
                </CardContent>
              </StatsCard>
            </Grid>

            <Grid item xs={12} sm={6} lg={3}>
              <StatsCard>
                <CardContent sx={{ p: { xs: 2, sm: 3 }, pt: { xs: 1.5, sm: 2 } }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <StatsIcon bgcolor="linear-gradient(135deg, #f44336, #d32f2f)">
                      <PeopleIcon />
                    </StatsIcon>
                    <Box>
                      <Typography variant="h6" color="text.secondary" sx={{ mb: 0.5, fontWeight: 500 }}>
                        Admin Users
                      </Typography>
                      <StatsValue color="#f44336">{adminUsers}</StatsValue>
                    </Box>
                  </Stack>
                </CardContent>
              </StatsCard>
            </Grid>

            <Grid item xs={12} sm={6} lg={3}>
              <StatsCard>
                <CardContent sx={{ p: { xs: 2, sm: 3 }, pt: { xs: 1.5, sm: 2 } }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <StatsIcon bgcolor="linear-gradient(135deg, #ff9800, #f57c00)">
                      <PeopleIcon />
                    </StatsIcon>
                    <Box>
                      <Typography variant="h6" color="text.secondary" sx={{ mb: 0.5, fontWeight: 500 }}>
                        New This Week
                      </Typography>
                      <StatsValue color="#ff9800">{recentUsers}</StatsValue>
                    </Box>
                  </Stack>
                </CardContent>
              </StatsCard>
            </Grid>
          </Grid>

          {/* Enhanced Search and Actions */}
          <TableContainer>
            <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={6}>
                  <EnhancedSearch
                    fullWidth
                    placeholder="Search by name, email, phone, role, or office..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center">
                    <Chip 
                      label={`${filteredUsers.length} users`} 
                      color="primary" 
                      variant="outlined"
                      sx={{ fontWeight: 600 }}
                    />
                    <Tooltip title="Filter">
                      <IconButton>
                        <FilterIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download">
                      <IconButton>
                        <DownloadIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Reload">
                      <IconButton onClick={handleReload}>
                        <RefreshIcon />
                      </IconButton>
                    </Tooltip>
                    <ActionButton 
                      variant="contained" 
                      onClick={handleOpen}
                      startIcon={<AddIcon />}
                    >
                      Add User
                    </ActionButton>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            
            <UsersTable users={paginatedUsers} loadingRowId={loadingRowId} />
            
            {/* Pagination */}
            {totalPages > 1 && (
              <PaginationContainer>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} users
                  </Typography>
                </Box>
                <StyledPagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                />
              </PaginationContainer>
            )}
          </TableContainer>

          <AddUserDialog open={open} handleClose={handleClose} onSubmit={handleAddUser} />
        </>
      )}
    </UsersContainer>
  );
}
