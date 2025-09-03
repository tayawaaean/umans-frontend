import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, IconButton, InputAdornment, Box, Typography, Stack, Divider, Chip, Avatar, Fade, Zoom } from "@mui/material";
import { Autorenew as GenerateIcon, Visibility, VisibilityOff, Category, Add } from "@mui/icons-material";
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import { styled, keyframes } from '@mui/material/styles';

//validation imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addUserTypeSchema } from "../../utils/validationSchema";

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

// Styled components
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '20px',
    background: theme.palette.mode === 'light'
      ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`
      : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[900]} 100%)`,
    border: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]}`,
    boxShadow: theme.palette.mode === 'light'
      ? '0 20px 60px rgba(0, 0, 0, 0.15)'
      : '0 20px 60px rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(20px)',
    maxWidth: '500px',
    width: '100%',
  },
}));

const DialogHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 3, 2, 3),
  borderBottom: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]}`,
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${theme.palette.primary.main}08, ${theme.palette.primary.main}15)`
    : `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.primary.main}25)`,
}));

const DialogTitleStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
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
  '& .MuiFormControl-root': {
    marginBottom: theme.spacing(2),
  },
}));

const ModernTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: theme.palette.mode === 'light' ? `${theme.palette.grey[50]}80` : `${theme.palette.grey[800]}80`,
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
    border: `2px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: `${theme.palette.primary.main}15`,
      transform: 'translateY(-2px)',
    },
  }),
}));

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: `${theme.palette.primary.main}15`,
    transform: 'scale(1.1)',
  },
}));

const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  borderRadius: '12px',
  background: theme.palette.mode === 'light'
    ? `${theme.palette.grey[50]}40`
    : `${theme.palette.grey[800]}40`,
  border: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[700]}`,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1rem',
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const AddUserTypeDialog = ({ open, handleClose, onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(addUserTypeSchema),
        defaultValues: {
            userType: "",
        },
    });
  

  return (
    <StyledDialog open={open} onClose={handleClose} fullWidth>
      <Fade in={open} timeout={300}>
        <Box>
          <DialogHeader>
            <DialogTitleStyled>
              <Category sx={{ fontSize: 28 }} />
              Add New User Type
            </DialogTitleStyled>
          </DialogHeader>
          
          <DialogContentStyled>
            <FormSection sx={{ animation: `${fadeInUp} 0.6s ease-out 0.1s both` }}>
              <SectionTitle>
                <Category sx={{ fontSize: 20 }} />
                User Type Details
              </SectionTitle>
              
              <ModernTextField
                label="User Type Name"
                {...register("userType")}
                fullWidth
                error={!!errors.userType}
                helperText={errors.userType?.message}
                placeholder="e.g., Admin, User, Manager"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Category sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </FormSection>
          </DialogContentStyled>

          <DialogActions sx={{ p: 3, gap: 2 }}>
            <ActionButton 
              onClick={handleClose} 
              variant="outlined"
              sx={{ animation: `${slideInLeft} 0.6s ease-out 0.2s both` }}
            >
              Cancel
            </ActionButton>
            <ActionButton 
              onClick={handleSubmit(onSubmit)} 
              variant="contained"
              sx={{ animation: `${slideInLeft} 0.6s ease-out 0.3s both` }}
            >
              Add User Type
            </ActionButton>
          </DialogActions>
        </Box>
      </Fade>
    </StyledDialog>
  );
};

export default AddUserTypeDialog;