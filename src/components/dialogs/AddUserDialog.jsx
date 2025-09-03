import React, { useState } from "react";
import { 
  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, 
  MenuItem, IconButton, InputAdornment, Box, Typography, Stack, 
  Divider, Chip, Avatar, Fade, Zoom
} from "@mui/material";
import { 
  Autorenew as GenerateIcon, PersonAdd, Visibility, VisibilityOff,
  Email, Phone, Business, Security, Person, Lock
} from "@mui/icons-material";
import { styled, keyframes } from '@mui/material/styles';

//validation imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../utils/validationSchema";

import AppTheme from '../../shared-theme/AppTheme';
import ColorModeSelect from '../../shared-theme/ColorModeSelect';
import CssBaseline from '@mui/material/CssBaseline';

// Modern animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
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
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '24px',
    background: theme.palette.mode === 'light'
      ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`
      : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[900]} 100%)`,
    border: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]}`,
    boxShadow: theme.palette.mode === 'light'
      ? '0 20px 60px rgba(0, 0, 0, 0.15)'
      : '0 20px 60px rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(20px)',
    maxWidth: '600px',
    width: '100%',
    animation: `${fadeInUp} 0.4s ease-out`,
  },
}));

const DialogHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 3, 2, 3),
  borderBottom: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]}`,
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${theme.palette.primary.main}10, ${theme.palette.primary.main}05)`
    : `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.primary.main}10)`,
}));

const DialogTitleStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.5rem',
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
    : `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
  '&.MuiDialogContent-root': {
    paddingTop: theme.spacing(2),
  },
}));

const ModernTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: theme.palette.mode === 'light'
      ? `${theme.palette.grey[50]}80`
      : `${theme.palette.grey[800]}80`,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[700]}`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`,
    },
    '&.Mui-focused': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 3px ${theme.palette.primary.main}20, 0 4px 12px rgba(0,0,0,0.1)`,
    },
  },
  '& .MuiInputLabel-root': {
    fontWeight: 600,
    color: theme.palette.text.secondary,
  },
}));

const ActionButton = styled(Button)(({ theme, variant }) => ({
  borderRadius: '12px',
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
  fontSize: '1rem',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  ...(variant === 'contained' && {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    boxShadow: `0 4px 16px ${theme.palette.primary.main}40`,
    '&:hover': {
      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
      boxShadow: `0 8px 24px ${theme.palette.primary.main}60`,
      transform: 'translateY(-2px)',
    },
  }),
  ...(variant === 'outlined' && {
    border: `2px solid ${theme.palette.grey[400]}`,
    color: theme.palette.text.primary,
    '&:hover': {
      borderColor: theme.palette.primary.main,
      backgroundColor: `${theme.palette.primary.main}15`,
      transform: 'translateY(-2px)',
    },
  }),
}));

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  borderRadius: '8px',
  padding: theme.spacing(1),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light'
      ? `${theme.palette.primary.main}15`
      : `${theme.palette.primary.main}25`,
    transform: 'scale(1.1)',
  },
}));

const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  animation: `${slideInLeft} 0.3s ease-out`,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.1rem',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

// Function to generate a secure password
const generatePassword = (length = 12) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map((x) => chars[x % chars.length])
    .join("");
};

const AddUserDialog = ({ open, handleClose, onSubmit, props }) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPassword2, setShowPassword2] = React.useState(false);
    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm({
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
  const togglePasswordVisibility2 = () => {
    setShowPassword2((prev) => !prev);
  }

  return (
    <AppTheme {...props}>
    <CssBaseline enableColorScheme />
      <StyledDialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogHeader>
          <DialogTitleStyled>
            <Avatar sx={{ 
              bgcolor: 'linear-gradient(135deg, #1976d2, #1565c0)', 
              width: 40, 
              height: 40,
              animation: `${pulse} 2s infinite`
            }}>
              <PersonAdd />
            </Avatar>
            Add New User
          </DialogTitleStyled>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Create a new user account with the required information
          </Typography>
        </DialogHeader>

        <DialogContentStyled>
          <FormSection>
            <SectionTitle>
              <Person />
              Personal Information
            </SectionTitle>
            <Stack spacing={2}>
              <ModernTextField 
                placeholder="Enter first name" 
                label="First Name" 
                {...register("firstName")} 
                fullWidth 
                error={!!errors.firstName} 
                helperText={errors.firstName?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <ModernTextField 
                placeholder="Enter last name" 
                label="Last Name" 
                {...register("lastName")} 
                fullWidth 
                error={!!errors.lastName} 
                helperText={errors.lastName?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </FormSection>

          <FormSection>
            <SectionTitle>
              <Email />
              Contact Information
            </SectionTitle>
            <Stack spacing={2}>
              <ModernTextField 
                placeholder="user@example.com" 
                label="Email Address" 
                {...register("email")} 
                type="email" 
                fullWidth 
                error={!!errors.email} 
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <ModernTextField 
                placeholder="+1 (555) 123-4567" 
                label="Mobile Number" 
                {...register("mobileNo")} 
                fullWidth 
                error={!!errors.mobileNo} 
                helperText={errors.mobileNo?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </FormSection>

          <FormSection>
            <SectionTitle>
              <Business />
              Organization Details
            </SectionTitle>
            <Stack spacing={2}>
              <ModernTextField 
                placeholder="Research Directorate" 
                label="Unit/Office" 
                {...register("office")} 
                fullWidth 
                error={!!errors.office} 
                helperText={errors.office?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Business sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <ModernTextField 
                select 
                label="User Role" 
                {...register("role")} 
                value={watch("role")} 
                fullWidth 
                error={!!errors.role} 
                helperText={errors.role?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Security sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="admin">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar sx={{ width: 24, height: 24, bgcolor: '#f44336' }}>
                      <Security sx={{ fontSize: 16 }} />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>Admin</Typography>
                      <Typography variant="caption" color="text.secondary">Full system access</Typography>
                    </Box>
                  </Stack>
                </MenuItem>
                <MenuItem value="user">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar sx={{ width: 24, height: 24, bgcolor: '#1976d2' }}>
                      <Person sx={{ fontSize: 16 }} />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>User</Typography>
                      <Typography variant="caption" color="text.secondary">Standard user access</Typography>
                    </Box>
                  </Stack>
                </MenuItem>
              </ModernTextField>
            </Stack>
          </FormSection>

          <FormSection>
            <SectionTitle>
              <Lock />
              Security Settings
            </SectionTitle>
            <Stack spacing={2}>
              <ModernTextField
            label="Password"
            {...register("password")}
            type={showPassword ? "text" : "password"}
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                endAdornment: (
                  <InputAdornment position="end">
                      <IconButtonStyled
                      onClick={() => 
                        setValue("password", generatePassword(),{
                          shouldDirty: true,
                          shouldTouch: true
                        })
                      }
                        title="Generate Secure Password"
                      >
                    <GenerateIcon />
                      </IconButtonStyled>
                      <IconButtonStyled onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButtonStyled>
                  </InputAdornment>
                ),
            }}
            InputLabelProps={{ shrink: !!watch("password") }}
            />

              <ModernTextField
            label="Confirm Password"
            {...register("confirmPassword")}
            type={showPassword2 ? "text" : "password"}
            fullWidth
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                endAdornment: (
                  <InputAdornment position="end">
                      <IconButtonStyled onClick={togglePasswordVisibility2}>
                      {showPassword2 ? <VisibilityOff /> : <Visibility />}
                      </IconButtonStyled>
                  </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </FormSection>
        </DialogContentStyled>

        <DialogActions sx={{ p: 3, gap: 2 }}>
          <ActionButton 
            variant="outlined" 
            onClick={() => { reset(); handleClose(); }}
          >
            Cancel
          </ActionButton>
          <ActionButton 
            variant="contained" 
            onClick={handleSubmit(onSubmit)}
            startIcon={<PersonAdd />}
          >
            Create User
          </ActionButton>
    </DialogActions>
      </StyledDialog>
  </AppTheme>
  );
};

export default AddUserDialog;