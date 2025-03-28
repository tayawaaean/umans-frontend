import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
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

const categories = [
  {
    id: 'Manage',
    children: [
      {
        id: 'Users',
        icon: <PeopleIcon />,
        path:'/',
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
      { id: 'Advance', icon: <PhonelinkSetupIcon />, path:'/settings' },
    ],
  },
];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  //"&.active": { backgroundColor: "rgba(174, 174, 174, 0.71)" }
  },
  
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};



export default function Navigator(props) {
  const { ...other } = props;
  const location = useLocation(); // Get current URL path

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          UMANS
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Overview</ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, path }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton component={NavLink} to={path} selected={location.pathname === path} sx={item}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
