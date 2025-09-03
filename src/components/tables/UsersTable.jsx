
import { useSelector } from "react-redux";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Typography, Box, Chip, Avatar, Stack
} from "@mui/material";
import { styled, keyframes } from '@mui/material/styles';
import { People, Security, Business, Phone, Email, CalendarToday, Edit } from '@mui/icons-material';
import UserRow from "./UserRow";

// Modern animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Three-color rule: Primary (Blue), Neutral (Gray), Accent (Green)
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '16px',
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`
    : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[900]} 100%)`,
  border: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]}`,
  boxShadow: theme.palette.mode === 'light'
    ? '0 4px 20px rgba(0, 0, 0, 0.08)'
    : '0 4px 20px rgba(0, 0, 0, 0.2)',
  backdropFilter: 'blur(10px)',
  overflow: 'hidden',
}));

const StyledTable = styled(Table)(({ theme }) => ({
  tableLayout: 'fixed',
  '& .MuiTableHead-root': {
    background: theme.palette.mode === 'light'
      ? `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[100]} 100%)`
      : `linear-gradient(135deg, ${theme.palette.grey[800]} 0%, ${theme.palette.grey[900]} 100%)`,
  },
  '& .MuiTableCell-root': {
    borderRight: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[700]}`,
    '&:last-child': {
      borderRight: 'none',
    },
  },
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  '& .MuiTableCell-root': {
    borderBottom: `2px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[700]}`,
    fontWeight: 700,
    fontSize: '0.9rem',
    color: theme.palette.text.primary,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    padding: theme.spacing(2, 1),
  },
}));

const HeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '0.9rem',
  color: theme.palette.text.primary,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  padding: theme.spacing(2, 1.5),
  borderBottom: `2px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[700]}`,
  verticalAlign: 'middle',
  height: '60px',
  textAlign: 'center',
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1),
    verticalAlign: 'middle',
  },
}));

const StyledTableBody = styled(TableBody)(({ theme }) => ({
  '& .MuiTableRow-root': {
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'light'
        ? `${theme.palette.primary.main}05`
        : `${theme.palette.primary.main}10`,
      transform: 'scale(1.01)',
      boxShadow: theme.palette.mode === 'light'
        ? '0 4px 12px rgba(0, 0, 0, 0.1)'
        : '0 4px 12px rgba(0, 0, 0, 0.2)',
    },
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.mode === 'light'
        ? `${theme.palette.grey[50]}30`
        : `${theme.palette.grey[800]}30`,
    },
  },
}));

const UsersTable = ({users, loadingRowId}) => {
  return(
    <StyledTableContainer>
      <StyledTable stickyHeader>
        <StyledTableHead>
          <TableRow>
            <HeaderCell sx={{ width: '8%' }}>
              <Edit sx={{ fontSize: 18 }} />
              Actions
            </HeaderCell>
            <HeaderCell sx={{ width: '8%' }}>
              <Security sx={{ fontSize: 18 }} />
              Role
            </HeaderCell>
            <HeaderCell sx={{ width: '12%' }}>
              <People sx={{ fontSize: 18 }} />
              First Name
            </HeaderCell>
            <HeaderCell sx={{ width: '12%' }}>
              <People sx={{ fontSize: 18 }} />
              Last Name
            </HeaderCell>
            <HeaderCell sx={{ width: '18%' }}>
              <Email sx={{ fontSize: 18 }} />
              Email
            </HeaderCell>
            <HeaderCell sx={{ width: '12%' }}>
              <Business sx={{ fontSize: 18 }} />
              Office
            </HeaderCell>
            <HeaderCell sx={{ width: '10%' }}>
              <Phone sx={{ fontSize: 18 }} />
              Mobile
            </HeaderCell>
            <HeaderCell sx={{ width: '10%' }}>
              <CalendarToday sx={{ fontSize: 18 }} />
              Updated
            </HeaderCell>
            <HeaderCell sx={{ width: '10%' }}>
              <CalendarToday sx={{ fontSize: 18 }} />
              Joined
            </HeaderCell>
            <HeaderCell sx={{ width: '8%' }}>
              <Security sx={{ fontSize: 18 }} />
              Status
            </HeaderCell>
          </TableRow>
        </StyledTableHead>
        <StyledTableBody>
          {users.map((user, index) => (
            <UserRow 
              key={user.id} 
              user={user} 
              loadingRowId={loadingRowId}
              animationDelay={index * 0.05}
            />
          ))}
        </StyledTableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

export default UsersTable;