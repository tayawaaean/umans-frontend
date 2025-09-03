import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff, Lock } from '@mui/icons-material';

import { useDispatch, useSelector } from "react-redux";

//import validation resources
import { useForm, Controller  } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSchema } from "../../utils/validationSchema";

//functions
import { changePassword } from "../../store/slices/usersSlice";

// Enhanced styling components
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '20px',
  minHeight: '600px',
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`
    : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[900]} 100%)`,
  border: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]}`,
  boxShadow: theme.palette.mode === 'light'
    ? '0 8px 32px rgba(0, 0, 0, 0.1)'
    : '0 8px 32px rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(20px)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${theme.palette.primary.main}10, ${theme.palette.primary.light}05)`
    : `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.primary.dark}10)`,
  borderBottom: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]}`,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    minHeight: '56px',
    backgroundColor: theme.palette.mode === 'light'
      ? `${theme.palette.grey[100]}80`
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
    fontSize: '1rem',
    fontWeight: 500,
  },
  '& .MuiOutlinedInput-input': {
    fontSize: '1rem',
    padding: theme.spacing(1.5, 1.5),
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  padding: theme.spacing(2, 4),
  fontWeight: 600,
  fontSize: '1.1rem',
  minHeight: '56px',
  textTransform: 'none',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  boxShadow: `0 4px 16px ${theme.palette.primary.main}40`,
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
    boxShadow: `0 8px 24px ${theme.palette.primary.main}60`,
    transform: 'translateY(-2px)',
  },
}));

const ProfileChangePasswordCard = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user ) || null

  const onSubmit = async (data) => {
    try{
      const response = await dispatch(changePassword({id: user.id , data: {...data, email: user.email}})).unwrap()
      if(response.success === "ok"){
        reset();
      }
    }catch (error) {
      console.error("Failed to change password:", error);
    }
  };

  const { handleSubmit, control, formState: { errors }, reset } = useForm({
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
    resolver: yupResolver(changePasswordSchema),
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggleVisibility = (key) => {
    setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <StyledCard>
      <HeaderSection>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Lock color="primary" />
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
            Change Password
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Update your password to keep your account secure
        </Typography>
      </HeaderSection>

      <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Stack spacing={4} sx={{ flexGrow: 1 }}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  type={showPassword.current ? 'text' : 'password'}
                  label="Current Password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => toggleVisibility('current')}
                          edge="end"
                        >
                          {showPassword.current ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  type={showPassword.new ? 'text' : 'password'}
                  label="New Password"
                  fullWidth
                  error={!!errors.newPassword}
                  helperText={errors.newPassword?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => toggleVisibility('new')}
                          edge="end"
                        >
                          {showPassword.new ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  type={showPassword.confirm ? 'text' : 'password'}
                  label="Confirm New Password"
                  fullWidth
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => toggleVisibility('confirm')}
                          edge="end"
                        >
                          {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Box sx={{ mt: 'auto', pt: 2 }}>
              <SubmitButton
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
              >
                Update Password
              </SubmitButton>
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </StyledCard>
  )
}

export default ProfileChangePasswordCard
