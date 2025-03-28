import React from 'react'
import {Snackbar, Alert } from '@mui/material/';
import { useSelector, useDispatch } from "react-redux";
import { closeSnackbar } from '../store/slices/usersSlice';

const AlertSnackbar = () => {
    const dispatch = useDispatch();
    const { open, message, severity } = useSelector((state) => state.users.snackbar);
    return (
        <Snackbar 
        open={open} 
        autoHideDuration={3000} 
        onClose={() => dispatch(closeSnackbar())}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
            <Alert
                severity={severity}
                onClose={() => dispatch(closeSnackbar())}
                variant="filled"
                sx={{boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)", borderRadius: "8px"}}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default AlertSnackbar
