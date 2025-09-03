import React, { useState } from "react";
import { 
  TableRow, TableCell, Select, MenuItem, IconButton, TextField, Tooltip,
  Chip, Avatar, Box, Stack, Typography
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/slices/usersSlice";
import { 
  Edit, Save, Cancel, CheckCircle, Cancel as CancelIcon, 
  Person, Security, Business, Phone, Email, CalendarToday
} from "@mui/icons-material";
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

// Three-color rule: Primary (Blue), Neutral (Gray), Accent (Green)
const StyledTableRow = styled(TableRow)(({ theme, animationDelay }) => ({
  animation: `${fadeInUp} 0.3s ease-out ${animationDelay}s both`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
  padding: theme.spacing(0.5),
  margin: theme.spacing(0, 0.5),
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

const ModernTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: theme.palette.mode === 'light'
      ? `${theme.palette.grey[50]}80`
      : `${theme.palette.grey[800]}80`,
    height: '40px',
    '& .MuiOutlinedInput-input': {
      padding: theme.spacing(1, 1.5),
      fontSize: '0.875rem',
    },
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
    },
  },
}));

const ModernSelect = styled(Select)(({ theme }) => ({
  borderRadius: '8px',
  backgroundColor: theme.palette.mode === 'light'
    ? `${theme.palette.grey[50]}80`
    : `${theme.palette.grey[800]}80`,
  height: '40px',
  '& .MuiSelect-select': {
    padding: theme.spacing(1, 1.5),
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
  },
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
  '&.Mui-focused': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
  },
}));

const RoleChip = styled(Chip)(({ theme, role }) => ({
  fontWeight: 600,
  fontSize: '0.75rem',
  height: 28,
  borderRadius: '14px',
  ...(role === 'admin' && {
    backgroundColor: `${theme.palette.error.main}20`,
    color: theme.palette.error.main,
    border: `1px solid ${theme.palette.error.main}40`,
  }),
  ...(role === 'user' && {
    backgroundColor: `${theme.palette.primary.main}20`,
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}40`,
  }),
}));

const StatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})(({ theme, isActive }) => ({
  fontWeight: 600,
  fontSize: '0.75rem',
  height: 28,
  borderRadius: '14px',
  ...(isActive && {
    backgroundColor: `${theme.palette.success.main}20`,
    color: theme.palette.success.main,
    border: `1px solid ${theme.palette.success.main}40`,
  }),
  ...(!isActive && {
    backgroundColor: `${theme.palette.error.main}20`,
    color: theme.palette.error.main,
    border: `1px solid ${theme.palette.error.main}40`,
  }),
}));

const UserRow = ({ user, loadingRowId, animationDelay = 0 }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    try{
        dispatch(updateUser({ id: user.id, data: editedUser })); // Only update this user
        setIsEditing(false);
    }catch(error){
        console.log(error)
    }
  };

  const isLoading = loadingRowId === user.id;

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
          <Tooltip title="Edit User">
            <ActionButton variant="edit" onClick={handleEditClick}>
              <Edit />
            </ActionButton>
          </Tooltip>
        )}
      </StyledTableCell>

      <StyledTableCell align="center" sx={{ width: '8%' }}>
        {isEditing ? (
          <ModernSelect
            value={editedUser.role}
            onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
            size="small"
            variant="outlined"
          >
            <MenuItem value="admin">
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar sx={{ width: 20, height: 20, bgcolor: '#f44336' }}>
                  <Security sx={{ fontSize: 12 }} />
                </Avatar>
                <Typography variant="body2">Admin</Typography>
              </Stack>
            </MenuItem>
            <MenuItem value="user">
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar sx={{ width: 20, height: 20, bgcolor: '#1976d2' }}>
                  <Person sx={{ fontSize: 12 }} />
                </Avatar>
                <Typography variant="body2">User</Typography>
              </Stack>
            </MenuItem>
          </ModernSelect>
        ) : (
          <RoleChip 
            role={user.role}
            label={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            size="small"
          />
        )}
      </StyledTableCell>

      <StyledTableCell align="center" sx={{ width: '12%' }}>
        {isEditing ? (
          <ModernTextField
            value={editedUser.firstName}
            onChange={(e) => setEditedUser({ ...editedUser, firstName: e.target.value })}
            size="small"
            variant="outlined"
            fullWidth
          />
        ) : (
          <Typography variant="body2" fontWeight={500}>
            {user.firstName}
          </Typography>
        )}
      </StyledTableCell>

      <StyledTableCell align="center" sx={{ width: '12%' }}>
        {isEditing ? (
          <ModernTextField
            value={editedUser.lastName}
            onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })}
            size="small"
            variant="outlined"
            fullWidth
          />
        ) : (
          <Typography variant="body2" fontWeight={500}>
            {user.lastName}
          </Typography>
        )}
      </StyledTableCell>

      <StyledTableCell align="center" sx={{ width: '18%' }}>
        {isEditing ? (
          <ModernTextField
            value={editedUser.email}
            onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
            size="small"
            variant="outlined"
            fullWidth
          />
        ) : (
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        )}
      </StyledTableCell>

      <StyledTableCell align="center" sx={{ width: '12%' }}>
        {isEditing ? (
          <ModernTextField
            value={editedUser.office}
            onChange={(e) => setEditedUser({ ...editedUser, office: e.target.value })}
            size="small"
            variant="outlined"
            fullWidth
          />
        ) : (
          <Typography variant="body2" color="text.secondary">
            {user.office}
          </Typography>
        )}
      </StyledTableCell>

      <StyledTableCell align="center" sx={{ width: '10%' }}>
        {isEditing ? (
          <ModernTextField
            value={editedUser.mobileNo}
            onChange={(e) => setEditedUser({ ...editedUser, mobileNo: e.target.value })}
            size="small"
            variant="outlined"
            fullWidth
          />
        ) : (
          <Typography variant="body2" color="text.secondary">
            {user.mobileNo}
          </Typography>
        )}
      </StyledTableCell>

      <StyledTableCell align="center" sx={{ width: '10%' }}>
        <Typography variant="caption" color="text.secondary">
          {new Date(user.updatedAt).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
      </StyledTableCell>

      <StyledTableCell align="center" sx={{ width: '10%' }}>
        <Typography variant="caption" color="text.secondary">
          {new Date(user.createdAt).toLocaleString("en-US", {
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
            value={editedUser.isActive}
            onChange={(e) => setEditedUser({ ...editedUser, isActive: e.target.value })}
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
          <Tooltip title={user.isActive ? "Deactivate User" : "Activate User"}>
            <ActionButton 
              onClick={() => dispatch(updateUser({ id: user.id, data: { isActive: !user.isActive } }))}
              variant={user.isActive ? "save" : "cancel"}
            >
              {user.isActive ? <CheckCircle /> : <Cancel />}
            </ActionButton>
          </Tooltip>
        )}
      </StyledTableCell>
    </StyledTableRow>
  );
};

// Prevent unnecessary re-renders
export default React.memo(UserRow);