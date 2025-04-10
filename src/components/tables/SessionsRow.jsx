import React, { useState } from "react";
import { TableRow, TableCell, Select, MenuItem, IconButton, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteSession } from "../../store/slices/sessionsSlice";
import { Edit, Save, Cancel, CheckCircle, Cancel as CancelIcon } from "@mui/icons-material";

const SessionsRow = ({ session, users, apps }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteSession({ id: session.id})); // Only update this app
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

    return (
        <TableRow key={session.id}>
            <TableCell align="center">
            <IconButton size="small" onClick={handleDelete} color="primary">
                <Edit fontSize="small" style={{ marginRight: 5 }}/> Delete
            </IconButton>
            </TableCell>
            <TableCell align="center">
                <TextField variant="standard" value={session.token} size="small" />
            </TableCell>
            <TableCell align="center">
                {userMap[session.userId]}
            </TableCell>
            <TableCell align="center">
                {appMap[session.appId]}
            </TableCell>

            <TableCell sx={{ textAlign: "center" }}>
                {new Date(session.expiresAt).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                })}
            </TableCell>
        </TableRow>
    );
};

// Prevent unnecessary re-renders
export default React.memo(SessionsRow);