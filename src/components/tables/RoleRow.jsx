import React, { useState } from "react";
import { TableRow, TableCell, Select, MenuItem, IconButton, Tooltip, Chip, Avatar, Box, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateRole } from "../../store/slices/rolesSlice";
import { Edit, Save, Cancel, CheckCircle, Cancel as CancelIcon } from "@mui/icons-material";
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
  ...(variant === 'edit' && {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: `${theme.palette.primary.main}15`,
      transform: 'scale(1.1)',
    },
  }),
  ...(variant === 'save' && {
    color: theme.palette.success.main,
    '&:hover': {
      backgroundColor: `${theme.palette.success.main}15`,
      transform: 'scale(1.1)',
    },
  }),
  ...(variant === 'cancel' && {
    color: theme.palette.error.main,
    '&:hover': {
      backgroundColor: `${theme.palette.error.main}15`,
      transform: 'scale(1.1)',
    },
  }),
}));

const ModernSelect = styled(Select)(({ theme }) => ({
  borderRadius: '8px',
  backgroundColor: theme.palette.mode === 'light' ? `${theme.palette.grey[50]}80` : `${theme.palette.grey[800]}80`,
  height: '40px',
  '& .MuiSelect-select': {
    padding: theme.spacing(1, 1.5),
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
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

const RoleRow = ({ role, users, apps, userTypes, loadingRowId, animationDelay = 0 }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedRole, setEditRole] = useState(role);

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => {
    setEditRole(role);
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    try{
      dispatch(updateRole({ id: role.id, data: editedRole })); // Only update this role
      setIsEditing(false);
    }catch(error){
      console.log(error)
    }
  };


  const isLoading = loadingRowId === role.id;

  return (
    <StyledTableRow animationDelay={animationDelay}>
      <StyledTableCell align="center" sx={{ width: '8%' }}>
        {isLoading ? (
          <LoadingScreen caption="Updating..." fullScreen={false} size={30} hideCaption={true} />
        ) : isEditing ? (
          <Stack direction="row" spacing={1} justifyContent="center">
            <Tooltip title="Save Changes">
              <ActionButton variant="save" onClick={handleSaveClick}>
                <Save />
              </ActionButton>
            </Tooltip>
            <Tooltip title="Cancel">
              <ActionButton variant="cancel" onClick={handleCancelClick}>
                <Cancel />
              </ActionButton>
            </Tooltip>
          </Stack>
        ) : (
          <Tooltip title="Edit Role">
            <ActionButton variant="edit" onClick={handleEditClick}>
              <Edit />
            </ActionButton>
          </Tooltip>
        )}
      </StyledTableCell>

      <StyledTableCell align="center" sx={{ width: '20%' }}>
        {isEditing ? (
          <ModernSelect
            value={editedRole.appsId || role.appsId}
            onChange={(e) => setEditRole({ ...editedRole, appsId: e.target.value })}
            size="small"
            variant="outlined"
            fullWidth
          >
            {apps.map((app) => (
              <MenuItem key={app.id} value={app.id}>
                {app.name}
              </MenuItem>
            ))}
          </ModernSelect>
        ) : (
          <Typography variant="body2" fontWeight={500}>
            {role.appName || "Unknown"}
          </Typography>
        )}
      </StyledTableCell>

      <StyledTableCell align="center" sx={{ width: '25%' }}>
        {isEditing ? (
          <ModernSelect
            value={editedRole.userId || role.userId}
            onChange={(e) => setEditRole({ ...editedRole, userId: e.target.value })}
            size="small"
            variant="outlined"
            fullWidth
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.firstName} {user.lastName} ({user.email})
              </MenuItem>
            ))}
          </ModernSelect>
        ) : (
          <Typography variant="body2" color="text.secondary">
            {role.userName || "Unknown"}
          </Typography>
        )}
      </StyledTableCell>

      <StyledTableCell align="center" sx={{ width: '15%' }}>
        {isEditing ? (
          <ModernSelect
            value={editedRole.userType || role.userType}
            onChange={(e) => setEditRole({ ...editedRole, userType: e.target.value })}
            size="small"
            variant="outlined"
            fullWidth
          >
            {userTypes.map((type) => (
              <MenuItem key={type.id} value={type.userType}>
                {type.userType}
              </MenuItem>
            ))}
          </ModernSelect>
        ) : (
          <Chip 
            label={role.userType || "Unknown"}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
        )}
      </StyledTableCell>

      <StyledTableCell align="center" sx={{ width: '16%' }}>
        <Typography variant="caption" color="text.secondary">
          {new Date(role.updatedAt).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
      </StyledTableCell>

      <StyledTableCell align="center" sx={{ width: '16%' }}>
        <Typography variant="caption" color="text.secondary">
          {new Date(role.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
      </StyledTableCell>

      <StyledTableCell align="center" sx={{ width: '8%' }}>
        {isEditing ? (
          <ModernSelect
            value={editedRole.isActive}
            onChange={(e) => setEditRole({ ...editedRole, isActive: e.target.value })}
            size="small"
            variant="outlined"
          >
            <MenuItem value={true}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <CheckCircle color="success" fontSize="small" />
                <Typography variant="body2">Active</Typography>
              </Stack>
            </MenuItem>
            <MenuItem value={false}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <CancelIcon color="error" fontSize="small" />
                <Typography variant="body2">Inactive</Typography>
              </Stack>
            </MenuItem>
          </ModernSelect>
        ) : (
          <Tooltip title={role.isActive ? "Deactivate Role" : "Activate Role"}>
            <ActionButton 
              onClick={() => dispatch(updateRole({ id: role.id, data: { isActive: !role.isActive } }))}
              variant={role.isActive ? "save" : "cancel"}
            >
              {role.isActive ? <CheckCircle /> : <Cancel />}
            </ActionButton>
          </Tooltip>
        )}
      </StyledTableCell>
    </StyledTableRow>
  );
};

// Prevent unnecessary re-renders
export default React.memo(RoleRow);