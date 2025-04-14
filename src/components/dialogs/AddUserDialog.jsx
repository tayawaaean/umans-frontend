import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, IconButton, InputAdornment } from "@mui/material";
import { Autorenew as GenerateIcon, PersonAdd, Visibility, VisibilityOff } from "@mui/icons-material";

//validation imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../utils/validationSchema";

import AppTheme from '../../shared-theme/AppTheme';
import ColorModeSelect from '../../shared-theme/ColorModeSelect';
import CssBaseline from '@mui/material/CssBaseline';

// Function to generate a secure password
const generatePassword = (length = 12) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map((x) => chars[x % chars.length])
    .join("");
};

const AddUserDialog = ({ open, handleClose, onSubmit, props }) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            mobileNo: "",
            office: "",
            role: "user",
            password: "",
            confirmPassword: "",
        },
    });
  
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  }

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
    <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          <PersonAdd fontSize="small" style={{ marginRight: 5 }} />Add New User
        </DialogTitle>
        <DialogContent>
            <TextField label="First Name" {...register("firstName")} fullWidth margin="dense" error={!!errors.firstName} helperText={errors.firstName?.message} />
            <TextField label="Last Name" {...register("lastName")} fullWidth margin="dense" error={!!errors.lastName} helperText={errors.lastName?.message} />
            <TextField label="Email" {...register("email")} type="email" fullWidth margin="dense" error={!!errors.email} helperText={errors.email?.message} />
            <TextField label="Mobile No." {...register("mobileNo")} fullWidth margin="dense" error={!!errors.mobileNo} helperText={errors.mobileNo?.message} />
            <TextField label="Office" {...register("office")} fullWidth margin="dense" error={!!errors.office} helperText={errors.office?.message} />
            <TextField select label="Role" {...register("role")} value={watch("role")} fullWidth margin="dense" error={!!errors.role} helperText={errors.role?.message}>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
            </TextField>

            {/* Password Field with Generate Button */}
            <TextField
            label="Password"
            {...register("password")}
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="dense"
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
                endAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={() => setValue("password", generatePassword())} title="Generate Password">
                    <GenerateIcon />
                    </IconButton>
                    <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                ),
            }}
            />

            {/* Confirm Password Field */}
            <TextField
            label="Confirm Password"
            {...register("confirmPassword")}
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="dense"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            InputProps={{
                endAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                ),
            }}
        />
      </DialogContent>

    <DialogActions>
      <Button onClick={handleClose} color="secondary">Cancel</Button>
      <Button onClick={handleSubmit(onSubmit)} color="primary" variant="contained">Add User</Button>
    </DialogActions>
  </Dialog>
  </AppTheme>
  );
};

export default AddUserDialog;