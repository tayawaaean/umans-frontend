import React, { useState } from "react";
import { TableRow, TableCell, Select, MenuItem, IconButton, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateUserType } from "../../store/slices/userTypesSlice";
import { Edit, Save, Cancel, CheckCircle, Cancel as CancelIcon } from "@mui/icons-material";

const TypeRow= ({ type }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedType, setEditedType] = useState(type);

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => {
    setEditedType(type);
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    dispatch(updateUserType({ id: type.id, data: editedType })); // Only update this type
    setIsEditing(false);
  };

  return (
    <TableRow key={type.id}>
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
      
        <TableCell align="center">
            {isEditing ? (
            <TextField
                variant="standard"
                value={editedType.userType}
                onChange={(e) => setEditedType({ ...editedType, userType: e.target.value })}
                size="small"
            />
            ) : (
            type.userType
            )}
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
            {new Date(type.updatedAt).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            })}
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
            {new Date(type.createdAt).toLocaleString("en-US", {
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
                value={editedType.isActive}
                onChange={(e) => setEditedType({ ...editedType, isActive: e.target.value })}
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
                <IconButton onClick={() => dispatch(updateUserType({ id: type.id, data: { isActive: !type.isActive } }))}>
                {type.isActive ? <CheckCircle color="success" /> : <Cancel color="error" />}
              </IconButton>
            )}
        </TableCell>
    </TableRow>
  );
};

// Prevent unnecessary re-renders
export default React.memo(TypeRow)