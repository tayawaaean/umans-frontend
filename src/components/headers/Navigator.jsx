import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, keyframes } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import ListIcon from '@mui/icons-material/List';
import GoogleIcon from '@mui/icons-material/Google';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import WorkIcon from '@mui/icons-material/Work';

import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { Typography } from '@mui/material';
import { UmansLogoStyled } from '../CustomIcons';


// Subtle animations - only for hover effects
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Three-color rule: Primary (Blue), Neutral (Gray), Accent (Green)
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 280,
    background: theme.palette.mode === 'light'
      ? `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`
      : `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[900]} 100%)`,
    borderRight: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]}`,
    boxShadow: theme.palette.mode === 'light'
      ? '0 0 20px rgba(0, 0, 0, 0.1)'
      : '0 0 20px rgba(0, 0, 0, 0.3)',
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 2),
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.primary.light}10)`
    : `linear-gradient(135deg, ${theme.palette.primary.dark}20, ${theme.palette.primary.main}15)`,
  borderBottom: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]}`,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60%',
    height: '2px',
    background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
    borderRadius: '1px',
  },
}));

const CategoryHeader = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  color: theme.palette.mode === 'light' ? theme.palette.grey[600] : theme.palette.grey[400],
  padding: theme.spacing(2, 2, 1, 2),
  marginTop: theme.spacing(2),
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  margin: theme.spacing(0.5, 1.5),
  borderRadius: '12px',
  padding: theme.spacing(1.5, 2),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  background: 'transparent',
  border: '1px solid transparent',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'transparent',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    background: theme.palette.mode === 'light'
      ? `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.primary.light}10)`
      : `linear-gradient(135deg, ${theme.palette.primary.main}25, ${theme.palette.primary.dark}15)`,
    border: `1px solid ${theme.palette.primary.main}30`,
    transform: 'translateX(4px)',
    boxShadow: `0 4px 12px ${theme.palette.primary.main}20`,
    '&::before': {
      opacity: 1,
    },
  },
  '& .MuiListItemIcon-root': {
    minWidth: 40,
    color: theme.palette.text.secondary,
    transition: 'all 0.3s ease',
  },
  '& .MuiListItemText-root': {
    '& .MuiTypography-root': {
      fontWeight: 500,
      color: theme.palette.text.primary,
      fontSize: '0.95rem',
      transition: 'all 0.3s ease',
    },
  },
  '&:hover .MuiListItemIcon-root': {
    color: theme.palette.primary.main,
    transform: 'scale(1.1)',
  },
  '&:hover .MuiListItemText-root .MuiTypography-root': {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
  // Active state styles
  '&.active': {
    background: theme.palette.mode === 'light'
      ? `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.primary.light}15)`
      : `linear-gradient(135deg, ${theme.palette.primary.main}30, ${theme.palette.primary.dark}20)`,
    border: `1px solid ${theme.palette.primary.main}40`,
    '&::before': {
      background: `linear-gradient(135deg, ${theme.palette.primary.main}10, transparent)`,
      opacity: 1,
    },
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
    '& .MuiListItemText-root .MuiTypography-root': {
      fontWeight: 600,
      color: theme.palette.primary.main,
    },
  },
}));

const ActiveIndicator = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  width: '4px',
  height: '60%',
  background: `linear-gradient(180deg, ${theme.palette.primary.main}, ${theme.palette.success.main})`,
  borderRadius: '0 2px 2px 0',
  boxShadow: `0 0 10px ${theme.palette.primary.main}50`,
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  borderColor: theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  '&::before, &::after': {
    borderColor: 'inherit',
  },
}));

const categories = [
  {
    id: 'Home',
    children: [
      {
        id: 'Overview',
        icon: <HomeIcon />,
        path:'/',
      },
    ],
  },
  {
    id: 'Manage',
    children: [
      {
        id: 'Users',
        icon: <PeopleIcon />,
        path:'/users',
      },
      { id: 'Apps', icon: <DnsRoundedIcon />, path:'/apps' },
      { id: 'Roles', icon: <WorkIcon />, path:'/roles' },
      { id: 'User Types', icon: <SupervisedUserCircleIcon />, path:'/userTypes' },
      { id: 'Google Accounts', icon: <GoogleIcon />, path:'/googleAccounts' },
      {
        id: 'Active Sessions',
        icon: <SettingsInputComponentIcon />,
        path:'/sessions'
      },
    ],
  },
  {
    id: 'Me',
    children: [
      { id: 'About', icon: <PublicIcon />, path:'/about' },
      { id: 'Contact', icon: <ContactPhoneIcon /> , path:'/contact'},
      { id: 'Logs', icon: <ListIcon />, path:'/logs' },
      { id: 'Profile', icon: <PhonelinkSetupIcon />, path:'/profile' },
    ],
  },
];



export default function Navigator(props) {
  const { ...other } = props;
  const location = useLocation(); // Get current URL path

  return (
    <StyledDrawer variant="permanent" {...other}>
      <List disablePadding>
        {/* Enhanced Logo Section */}
        <LogoContainer>
          <UmansLogoStyled 
            style={{ 
              width: 48, 
              height: 48,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
          <Box sx={{ ml: 1.5 }}>
            <Typography 
              sx={{ 
                fontWeight: 700, 
                fontSize: '1.1rem',
                color: 'text.primary',
                lineHeight: 1.2,
              }}
            >
              User Management
            </Typography>
            <Typography 
              sx={{ 
                fontWeight: 500, 
                fontSize: '0.8rem',
                color: 'text.secondary',
                lineHeight: 1,
              }}
            >
              System
            </Typography>
          </Box>
        </LogoContainer>

        {/* Navigation Categories */}
        {categories.map(({ id, children }, categoryIndex) => (
          <Box key={id}>
            <CategoryHeader>
              {id}
            </CategoryHeader>
            
            {children.map(({ id: childId, icon, path }, itemIndex) => {
              const isActive = location.pathname === path;
              return (
                <ListItem disablePadding key={childId} sx={{ mb: 0.5 }}>
                  <StyledListItemButton 
                    component={NavLink} 
                    to={path} 
                    className={isActive ? 'active' : ''}
                  >
                    {isActive && <ActiveIndicator />}
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={childId} />
                  </StyledListItemButton>
                </ListItem>
              );
            })}
            
            {categoryIndex < categories.length - 1 && <StyledDivider />}
          </Box>
        ))}
      </List>
    </StyledDrawer>
  );
}
