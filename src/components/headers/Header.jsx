import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { 
  AppBar, Avatar,Toolbar, Typography, IconButton, Menu, MenuItem,Button, Grid2, Tooltip, Link, Box, Chip, Badge

} from '@mui/material';

import AppTheme from '../../shared-theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';

import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle, Brightness4, Brightness7, Notifications, Settings, Logout, Person } from '@mui/icons-material';

import { useDispatch,useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import {useLocation, useNavigate  } from 'react-router-dom';

import { styled, alpha, keyframes } from '@mui/material/styles';

import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';

const avatarURL=import.meta.env.VITE_IMAGE_SERVER_URL

// Modern animations
const slideInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 5px rgba(25, 118, 210, 0.3); }
  50% { box-shadow: 0 0 20px rgba(25, 118, 210, 0.6); }
`;

// Three-color rule: Primary (Blue), Neutral (Gray), Accent (Green)
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`
    : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[900]} 100%)`,
  borderBottom: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]}`,
  boxShadow: theme.palette.mode === 'light'
    ? '0 2px 20px rgba(0, 0, 0, 0.1)'
    : '0 2px 20px rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(20px)',
  animation: `${slideInDown} 0.3s ease-out`,
  zIndex: theme.zIndex.appBar,
  position: 'relative',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: 72,
  padding: theme.spacing(0, 2),
  gap: theme.spacing(2),
  position: 'relative',
  zIndex: 5,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 1),
    gap: theme.spacing(1),
    minHeight: 64,
  },
}));

const TitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  flexGrow: 1,
  minWidth: 0, // Allow shrinking
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(0.5),
    marginLeft: theme.spacing(1),
  },
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.5rem',
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
    : `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
    maxWidth: '120px',
  },
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const BreadcrumbChip = styled(Chip)(({ theme }) => ({
  height: 28,
  fontSize: '0.8rem',
  fontWeight: 500,
  backgroundColor: theme.palette.mode === 'light'
    ? `${theme.palette.primary.main}15`
    : `${theme.palette.primary.main}25`,
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main}30`,
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light'
      ? `${theme.palette.primary.main}25`
      : `${theme.palette.primary.main}35`,
    transform: 'scale(1.05)',
  },
}));

const EnhancedSearch = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '16px',
  backgroundColor: theme.palette.mode === 'light'
    ? `${theme.palette.grey[100]}80`
    : `${theme.palette.grey[800]}80`,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[700]}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light'
      ? `${theme.palette.grey[100]}`
      : `${theme.palette.grey[800]}`,
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`,
    transform: 'translateY(-1px)',
  },
  '&:focus-within': {
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${theme.palette.primary.main}20, 0 4px 12px rgba(0,0,0,0.1)`,
    transform: 'translateY(-2px)',
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
    minWidth: '300px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  transition: 'color 0.3s ease',
  '.Mui-focused + &': {
    color: theme.palette.primary.main,
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    fontSize: '0.95rem',
    fontWeight: 500,
    transition: 'all 0.3s ease',
    '&::placeholder': {
      color: theme.palette.text.secondary,
      opacity: 0.8,
    },
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  position: 'relative',
  borderRadius: '12px',
  padding: theme.spacing(1),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  zIndex: 10,
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light'
      ? `${theme.palette.primary.main}15`
      : `${theme.palette.primary.main}25`,
    transform: 'scale(1.05)',
    boxShadow: `0 4px 12px ${theme.palette.primary.main}20`,
  },
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  border: `2px solid ${theme.palette.primary.main}30`,
  boxShadow: `0 4px 12px ${theme.palette.primary.main}20`,
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 6px 20px ${theme.palette.primary.main}30`,
    transform: 'scale(1.05)',
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '16px',
    marginTop: theme.spacing(1),
    minWidth: 200,
    background: theme.palette.mode === 'light'
      ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`
      : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[900]} 100%)`,
    border: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]}`,
    boxShadow: theme.palette.mode === 'light'
      ? '0 10px 40px rgba(0, 0, 0, 0.1)'
      : '0 10px 40px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(20px)',
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  borderRadius: '12px',
  margin: theme.spacing(0.5, 1),
  padding: theme.spacing(1.5, 2),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light'
      ? `${theme.palette.primary.main}15`
      : `${theme.palette.primary.main}25`,
    transform: 'translateX(4px)',
  },
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1.5),
    color: theme.palette.text.secondary,
  },
}));




function Header(props) {
  const { onDrawerToggle } = props;
  const dispatch = useDispatch();

  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const avatar = useSelector((state) => state.auth.user.avatar) || null
  const user = useSelector((state) => state.auth.user) || null
  const navigate = useNavigate();

  // Dynamic title based on the current path
  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/users':
        return 'Users';
      case '/apps':
        return 'Apps';
      case '/roles':
        return 'Roles';
      case '/userTypes':
        return 'User Types';
      case '/googleAccounts':
        return 'Google Accounts';
      case '/sessions':
        return 'Sessions';
      case '/about':
        return 'About';     
      case '/contact':
        return 'Contact';
      case '/logs':
        return 'Logs';
      case '/profile':
        return 'Profile';
      default:
        return 'Dashboard';
    }
  };

  // Get breadcrumb path
  const getBreadcrumb = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    if (pathSegments.length === 0) return ['Dashboard'];
    return pathSegments.map(segment => 
      segment.charAt(0).toUpperCase() + segment.slice(1)
    );
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logout());
    navigate('/login');
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu
  };

  const handleClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile'); // Navigate to profile page
  };

  
  return (
    <React.Fragment>
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <StyledAppBar position="sticky" elevation={0}>
          <StyledToolbar>
            {/* Mobile Menu Button */}
            <Grid2 sx={{ 
              display: { sm: 'none', xs: 'block' },
              position: 'relative',
              zIndex: 15,
              minWidth: '48px',
              flexShrink: 0
            }}>
              <ActionButton
                size="large"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
                sx={{
                  zIndex: 15,
                  position: 'relative',
                  backgroundColor: 'background.paper',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <MenuIcon />
              </ActionButton>
            </Grid2>

            {/* Title and Breadcrumb Section */}
            <TitleContainer>
              <PageTitle component={Link} to="/">
                {getTitle()}
              </PageTitle>
              
              {/* Breadcrumb Navigation */}
              <Box sx={{ 
                display: { xs: 'none', sm: 'flex' }, 
                alignItems: 'center', 
                gap: 1, 
                ml: 2,
                overflow: 'hidden'
              }}>
                {getBreadcrumb().map((crumb, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <Typography variant="body2" color="text.secondary" sx={{ mx: 0.5 }}>
                        /
                      </Typography>
                    )}
                    <BreadcrumbChip 
                      label={crumb} 
                      size="small"
                      onClick={() => {
                        const path = '/' + getBreadcrumb().slice(0, index + 1).join('/').toLowerCase();
                        navigate(path);
                      }}
                    />
                  </React.Fragment>
                ))}
              </Box>
            </TitleContainer>

            {/* Action Buttons */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: { xs: 0.5, sm: 1 },
              flexShrink: 0
            }}>
              {/* Notifications */}
              <Tooltip title="Notifications">
                <ActionButton sx={{ display: { xs: 'none', sm: 'flex' } }}>
                  <Badge badgeContent={3} color="error">
                    <Notifications />
                  </Badge>
                </ActionButton>
              </Tooltip>

              {/* Theme Toggle */}
              <ColorModeIconDropdown />

              {/* Enhanced Search */}
              <EnhancedSearch sx={{ 
                display: { xs: 'none', sm: 'block' },
                minWidth: { xs: 'auto', sm: '200px' }
              }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search users, apps, roles..."
                  inputProps={{ 'aria-label': 'search' }}
                />
              </EnhancedSearch>

              {/* User Account */}
              <Tooltip title={user?.firstName ? `${user.firstName} ${user.lastName}` : 'User Account'}>
                <ActionButton onClick={handleClick}>
                  {avatar ? (
                    <UserAvatar
                      src={`${avatarURL}${avatar}`}
                      alt="User Avatar"
                    />
                  ) : (
                    <UserAvatar>
                      <AccountCircle />
                    </UserAvatar>
                  )}
                </ActionButton>
              </Tooltip>

              {/* Enhanced User Menu */}
              <StyledMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                {/* User Info Header */}
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {user?.firstName ? `${user.firstName} ${user.lastName}` : 'User'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user?.email || 'user@example.com'}
                  </Typography>
                </Box>

                <StyledMenuItem onClick={handleProfile}>
                  <Person />
                  Profile
                </StyledMenuItem>
                
                <StyledMenuItem onClick={handleClose}>
                  <Settings />
                  Settings
                </StyledMenuItem>
                
                <StyledMenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                  <Logout />
                  Logout
                </StyledMenuItem>
              </StyledMenu>
            </Box>
          </StyledToolbar>
        </StyledAppBar>
      </AppTheme>
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
