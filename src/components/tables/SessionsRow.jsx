import React, { useState } from "react";
import { TableRow, TableCell, Select, MenuItem, IconButton, TextField, Tooltip, Chip, Avatar, Box, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteSession } from "../../store/slices/sessionsSlice";
import { Edit, Delete, Cancel, CheckCircle, Cancel as CancelIcon } from "@mui/icons-material";
import { styled, keyframes } from '@mui/material/styles';
import LoadingScreen from "../LoadingScreen";

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

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled components
const StyledTableRow = styled(TableRow)(({ theme, animationDelay }) => ({
  animation: `${fadeInUp} 0.6s ease-out ${animationDelay}s both`,
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
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2, 1.5),
  borderBottom: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800]}`,
  transition: 'all 0.3s ease',
  verticalAlign: 'middle',
  height: '60px',
  '& .MuiTypography-root': {
    lineHeight: 1.2,
  },
}));

const ActionButton = styled(IconButton)(({ theme, variant }) => ({
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  ...(variant === 'delete' && {
    color: theme.palette.error.main,
    '&:hover': {
      backgroundColor: `${theme.palette.error.main}15`,
      transform: 'scale(1.1)',
    },
  }),
}));

const ModernTextField = styled(TextField)(({ theme }) => ({
  borderRadius: '8px',
  backgroundColor: theme.palette.mode === 'light' ? `${theme.palette.grey[50]}80` : `${theme.palette.grey[800]}80`,
  height: '40px',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1.5),
    fontSize: '0.875rem',
  },
  '&:hover': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
  },
  '&.Mui-focused': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
  },
}));

const StatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})(({ theme, isActive }) => ({
  fontWeight: 600,
  fontSize: '0.75rem',
  height: 28,
  borderRadius: '14px',
  ...(isActive ? {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  } : {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  }),
}));

const SessionsRow = ({ session, users, apps, loadingRowId, animationDelay = 0 }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        try{
            dispatch(deleteSession({ id: session.id})); // Only update this app
        }catch(error){
            console.log(error)
        }

    };
    const appMap = apps.reduce((acc, app) => {
        acc[app.id] = app.name;
        acc[0] = "This App (UMANS)";
        return acc;
    }, {});

    const userMap = users.reduce((acc, user) => {
        acc[user.id] = `${user.firstName} ${user.lastName}`;
        return acc;
    }, {});

    const isLoading = loadingRowId === session.id;

    const isSessionActive = new Date(session.expiresAt) > new Date();

    return (
        <StyledTableRow animationDelay={animationDelay}>
            <StyledTableCell align="center" sx={{ width: '10%' }}>
                {isLoading ? (
                    <LoadingScreen caption="Deleting..." fullScreen={false} size={30} hideCaption={true} />
                ) : (
                    <Tooltip title="Delete Session">
                        <ActionButton variant="delete" onClick={handleDelete}>
                            <Delete />
                        </ActionButton>
                    </Tooltip>
                )}
            </StyledTableCell>

            <StyledTableCell align="center" sx={{ width: '30%' }}>
                <ModernTextField 
                    value={session.token} 
                    size="small" 
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </StyledTableCell>

            <StyledTableCell align="center" sx={{ width: '25%' }}>
                <Typography variant="body2" fontWeight={500}>
                    {userMap[session.userId] || 'Unknown User'}
                </Typography>
            </StyledTableCell>

            <StyledTableCell align="center" sx={{ width: '20%' }}>
                <Chip 
                    label={appMap[session.appId] || 'Unknown App'}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                />
            </StyledTableCell>

            <StyledTableCell align="center" sx={{ width: '15%' }}>
                <Stack spacing={1} alignItems="center">
                    <Typography variant="caption" color="text.secondary">
                        {new Date(session.expiresAt).toLocaleString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </Typography>
                    <StatusChip 
                        label={isSessionActive ? "Active" : "Expired"}
                        isActive={isSessionActive}
                        size="small"
                    />
                </Stack>
            </StyledTableCell>
        </StyledTableRow>
    );
};

// Prevent unnecessary re-renders
export default React.memo(SessionsRow);