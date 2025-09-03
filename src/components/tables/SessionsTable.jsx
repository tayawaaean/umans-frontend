
import { useSelector } from "react-redux";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Chip, Avatar, Stack
} from "@mui/material";
import { styled, keyframes } from '@mui/material/styles';
import { Delete, VpnKey, Person, Apps, CalendarToday } from '@mui/icons-material';
import SessionsRow from "./SessionsRow";

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

// Styled components
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
        ? `${theme.palette.primary.main}08` 
        : `${theme.palette.primary.main}15`,
      transform: 'translateY(-1px)',
      boxShadow: theme.palette.mode === 'light'
        ? '0 4px 12px rgba(0, 0, 0, 0.1)'
        : '0 4px 12px rgba(0, 0, 0, 0.3)',
    },
  },
}));

const SessionsTable = ({sessions, apps, users, loadingRowId}) => {
  return (
    <StyledTableContainer>
      <StyledTable stickyHeader>
        <StyledTableHead>
          <TableRow>
            <HeaderCell sx={{ width: '10%' }}>
              <Delete sx={{ fontSize: 18 }} />
              Actions
            </HeaderCell>
            <HeaderCell sx={{ width: '30%' }}>
              <VpnKey sx={{ fontSize: 18 }} />
              Token
            </HeaderCell>
            <HeaderCell sx={{ width: '25%' }}>
              <Person sx={{ fontSize: 18 }} />
              User
            </HeaderCell>
            <HeaderCell sx={{ width: '20%' }}>
              <Apps sx={{ fontSize: 18 }} />
              App
            </HeaderCell>
            <HeaderCell sx={{ width: '15%' }}>
              <CalendarToday sx={{ fontSize: 18 }} />
              Expires At
            </HeaderCell>
          </TableRow>
        </StyledTableHead>
        <StyledTableBody>
          {sessions.map((session, index) => (
            <SessionsRow 
              key={session.id} 
              session={session} 
              users={users} 
              apps={apps} 
              loadingRowId={loadingRowId}
              animationDelay={index * 0.1}
            />
          ))}
        </StyledTableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

export default SessionsTable;