import React, { useState } from "react";
import { TableRow, TableCell, Select, MenuItem, IconButton, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateApp } from "../../store/slices/appsSlice";
import { Edit, Save, Cancel, CheckCircle, Cancel as CancelIcon } from "@mui/icons-material";

const AppRow = ({ app }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedApp, setEditedApp] = useState(app);

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => {
    setEditedApp(app);
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    dispatch(updateApp({ id: app.id, data: editedApp })); // Only update this app
    setIsEditing(false);
  };

  return (
    <TableRow key={app.id}>
        <TableCell align="center">
        {isEditing ? (
          <>
            <IconButton onClick={handleSaveClick} color="success">
              <Save />
            </IconButton>
            <IconButton onClick={handleCancelClick} color="error">
              <Cancel />
            </IconButton>
          </>
        ) : (
          <IconButton onClick={handleEditClick} color="primary">
            <Edit />
          </IconButton>
        )}
        </TableCell>
        <TableCell align="center">
            {isEditing ? (
            <TextField
                variant="standard"
                value={editedApp.name}
                onChange={(e) => setEditedApp({ ...editedApp, name: e.target.value })}
                size="small"
            />
            ) : (
            app.name
            )}
        </TableCell>
        <TableCell align="center">
            {isEditing ? (
            <TextField
                variant="standard"
                value={editedApp.url}
                onChange={(e) => setEditedApp({ ...editedApp, url: e.target.value })}
                size="small"
            />
            ) : (
            app.url
            )}
        </TableCell>
        <TableCell align="center">
            {isEditing ? (
            <TextField
                variant="standard"
                value={editedApp.ownerOffice}
                onChange={(e) => setEditedApp({ ...editedApp, ownerOffice: e.target.value })}
                size="small"
            />
            ) : (
            app.ownerOffice
            )}
        </TableCell>
        <TableCell align="center">
            {isEditing ? (
            <TextField
                variant="standard"
                value={editedApp.email}
                onChange={(e) => setEditedApp({ ...editedApp, email: e.target.value })}
                size="small"
            />
            ) : (
            app.email
            )}
        </TableCell>

        <TableCell align="center">
            {isEditing ? (
            <TextField
                variant="standard"
                value={editedApp.mobileNumber}
                onChange={(e) => setEditedApp({ ...editedApp, mobileNumber: e.target.value })}
                size="small"
            />
            ) : (
            app.mobileNumber
            )}
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
            {new Date(app.updatedAt).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            })}
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
            {new Date(app.createdAt).toLocaleString("en-US", {
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
                value={editedApp.isActive}
                onChange={(e) => setEditedApp({ ...editedApp, isActive: e.target.value })}
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
                <IconButton onClick={() => dispatch(updateApp({ id: app.id, data: { isActive: !app.isActive } }))}>
                {app.isActive ? <CheckCircle color="success" /> : <Cancel color="error" />}
              </IconButton>
            )}
        </TableCell>
    </TableRow>
  );
};

// Prevent unnecessary re-renders
export default React.memo(AppRow);