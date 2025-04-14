import React, { useState } from "react";
import { TableRow, TableCell, Select, MenuItem, IconButton, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateRole } from "../../store/slices/rolesSlice";
import { Edit, Save, Cancel, CheckCircle, Cancel as CancelIcon } from "@mui/icons-material";


const RoleRow = ({ role, users, apps, userTypes }) => {
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

  const appMap = apps.reduce((acc, app) => {
    acc[app.id] = app.name;
    return acc;
  }, {});

  const userMap = users.reduce((acc, user) => {
    acc[user.id] = `${user.firstName} ${user.lastName}`;
    return acc;
  }, {});


  return (
    <TableRow key={role.id}>
        <TableCell align="center">
        {isEditing ? (
          <>
            <IconButton size="small" onClick={handleSaveClick} color="success">
              <Save fontSize="small" style={{ marginRight: 5 }}/> Save
            </IconButton>
            <IconButton size="small" onClick={handleCancelClick} color="error">
              <Cancel fontSize="small" style={{ marginRight: 5 }}/> Cancel 
            </IconButton>
          </>
        ) : (
          <IconButton size="small" onClick={handleEditClick} color="primary">
            <Edit fontSize="small" style={{ marginRight: 5 }}/> Edit
          </IconButton>
        )}
        </TableCell>
        <TableCell>
            {isEditing ? (
            <Select
                value={editedRole.appsId || role.appsId}
                onChange={(e) => setEditRole({ ...editedRole, appsId: e.target.value })}
                size="small"
            >
                {apps.map((app) => (
                <MenuItem key={app.id} value={app.id}>
                    {app.name}
                </MenuItem>
                ))}
            </Select>
            ) : (
            appMap[role.appsId] || "Unknown"
            )}
        </TableCell>
        <TableCell>
            {isEditing ? (
            <Select
                value={editedRole.userId || role.userId}
                onChange={(e) => setEditRole({ ...editedRole, userId: e.target.value })}
                size="small"
            >
                {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                    {user.firstName} {user.lastName} ({user.email})
                </MenuItem>
                ))}
            </Select>
            ) : (
            userMap[role.userId] || "Unknown"
            )}
        </TableCell>
        <TableCell>
            {isEditing ? (
            <Select
                value={editedRole.userType || role.userType}
                onChange={(e) => setEditRole({ ...editedRole, userType: e.target.value })}
                size="small"
            >
                {userTypes.map((type) => (
                <MenuItem key={type.id} value={type.userType}>
                    {type.userType}
                </MenuItem>
                ))}
            </Select>
            ) : (
            role.userType || "Unknown"
            )}
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
            {new Date(role.updatedAt).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            })}
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
            {new Date(role.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            })}
        </TableCell>
        <TableCell>
            {isEditing ? (
            <Select
                variant="standard"
                value={editedRole.isActive}
                onChange={(e) => setEditRole({ ...editedRole, isActive: e.target.value })}
                size="small"
            >
                <MenuItem value={true}>
                    <CheckCircle color="success" fontSize="small" style={{ marginRight: 5 }} />
                    Active
                </MenuItem>
                <MenuItem value={false}>
                    <CancelIcon color="error" fontSize="small" style={{ marginRight: 5 }} />
                    Inactive
                </MenuItem>
            </Select>
            ) : (
                <IconButton onClick={() => dispatch(updateRole({ id: role.id, data: { isActive: !role.isActive } }))}>
                {role.isActive ? <CheckCircle color="success" /> : <Cancel color="error" />}
              </IconButton>
            )}
        </TableCell>
    </TableRow>
  );
};

// Prevent unnecessary re-renders
export default React.memo(RoleRow);