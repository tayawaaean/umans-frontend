//import mui components
import { Divider, FormLabel, FormControl, TextField, Button, Checkbox, Typography, Box, Alert, CircularProgress } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled, keyframes } from '@mui/material/styles';
import ForgotPassword from '../../components/ForgotPassword';
import AppTheme from '../../shared-theme/AppTheme';
import ColorModeSelect from '../../shared-theme/ColorModeSelect';
import { GoogleIcon, FacebookIcon, SitemarkIcon, UmansLogoStyled } from '../../components/CustomIcons';

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


//google imports
import { googleLogin, callback } from "../../store/slices/googleSlice"; // Update with actual path
import  googleApi from "../../api/googleApi" 
import { useGoogleLogin } from "@react-oauth/google";

//import react/redux components
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//import reducer functions
import { login } from "../../store/slices/authSlice";

//import validation resources
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/validationSchema";
import LoadingScreen from "../../components/LoadingScreen";

// Modern animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-15px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

export const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(3),
  margin: 'auto',
  borderRadius: '24px',
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '480px',
    padding: theme.spacing(5),
  },
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`
    : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[900]} 100%)`,
  border: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]}`,
  boxShadow: theme.palette.mode === 'light'
    ? '0 20px 60px rgba(0, 0, 0, 0.1), 0 8px 32px rgba(0, 0, 0, 0.05)'
    : '0 20px 60px rgba(0, 0, 0, 0.3), 0 8px 32px rgba(0, 0, 0, 0.2)',
  backdropFilter: 'blur(20px)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.mode === 'light'
      ? '0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.05)'
      : '0 20px 40px rgba(0, 0, 0, 0.3), 0 8px 20px rgba(0, 0, 0, 0.2)',
  },
}));

export const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100vh',
  width: '100vw',
  padding: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    background: theme.palette.mode === 'light'
      ? `radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%) 0%, hsl(0, 0%, 100%) 50%, hsl(220, 100%, 98%) 100%)`
      : `radial-gradient(ellipse at 50% 50%, hsla(210, 100%, 16%, 0.8) 0%, hsl(220, 30%, 5%) 50%, hsla(220, 100%, 8%, 0.9) 100%)`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: theme.palette.mode === 'light'
      ? `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${theme.palette.primary.main}05 60deg, transparent 120deg, ${theme.palette.secondary.main}05 180deg, transparent 240deg, ${theme.palette.primary.main}05 300deg, transparent 360deg)`
      : `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${theme.palette.primary.main}10 60deg, transparent 120deg, ${theme.palette.secondary.main}10 180deg, transparent 240deg, ${theme.palette.primary.main}10 300deg, transparent 360deg)`,
    animation: `${float} 30s linear infinite`,
    zIndex: -1,
    opacity: 0.2,
  },
}));

// Enhanced styled components
const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: 'clamp(2rem, 8vw, 2.5rem)',
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
    : `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'center',
  marginBottom: theme.spacing(1),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    backgroundColor: theme.palette.mode === 'light' 
      ? `${theme.palette.grey[50]}80` 
      : `${theme.palette.grey[900]}80`,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[700]}`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    [theme.breakpoints.down('sm')]: {
      borderRadius: '12px',
    },
    '&:hover': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`,
      transform: 'translateY(-1px)',
    },
    '&.Mui-focused': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 3px ${theme.palette.primary.main}20, 0 4px 12px rgba(0,0,0,0.1)`,
      transform: 'translateY(-2px)',
    },
    '&.Mui-error': {
      borderColor: theme.palette.error.main,
      boxShadow: `0 0 0 3px ${theme.palette.error.main}20`,
    },
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 2),
    fontSize: '1rem',
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.2, 1.5),
      fontSize: '0.95rem',
    },
  },
  '& .MuiFormLabel-root': {
    fontWeight: 600,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '16px',
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
  fontSize: '1rem',
  textTransform: 'none',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  boxShadow: `0 8px 24px ${theme.palette.primary.main}40`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  minHeight: '48px', // Better touch target
  [theme.breakpoints.down('sm')]: {
    borderRadius: '12px',
    padding: theme.spacing(1.2, 2.5),
    fontSize: '0.95rem',
    minHeight: '44px',
  },
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
    boxShadow: `0 12px 32px ${theme.palette.primary.main}60`,
    transform: 'translateY(-2px)',
  },
  '&:active': {
    transform: 'translateY(0px)',
  },
  '&:disabled': {
    background: theme.palette.grey[300],
    boxShadow: 'none',
    transform: 'none',
  },
}));

const SocialButton = styled(Button)(({ theme }) => ({
  borderRadius: '16px',
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
  fontSize: '1rem',
  textTransform: 'none',
  border: `2px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[700]}`,
  backgroundColor: theme.palette.mode === 'light' 
    ? `${theme.palette.background.paper}80` 
    : `${theme.palette.grey[900]}80`,
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  minHeight: '48px', // Better touch target
  [theme.breakpoints.down('sm')]: {
    borderRadius: '12px',
    padding: theme.spacing(1.2, 2.5),
    fontSize: '0.95rem',
    minHeight: '44px',
  },
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.mode === 'light'
      ? `${theme.palette.primary.main}10`
      : `${theme.palette.primary.main}20`,
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 24px ${theme.palette.primary.main}20`,
  },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(3, 0),
  '&::before, &::after': {
    borderColor: theme.palette.mode === 'light' 
      ? theme.palette.grey[300] 
      : theme.palette.grey[600],
  },
  '& .MuiDivider-wrapper': {
    color: theme.palette.text.secondary,
    fontWeight: 600,
    fontSize: '0.9rem',
    padding: theme.spacing(0, 2),
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SignIn() {
  
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const { user, loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  //run before rendering the component with the hook
  useEffect(() => {
    if (user && isAuthenticated && !loading && !isNavigating) {
      setIsNavigating(true);
      navigate("/", { replace: true }); // Redirect to dashboard after login
    }
  }, [user, isAuthenticated, loading, navigate, isNavigating]);

  // Set animation flag on component mount and persist it
  useEffect(() => {
    const hasAnimatedBefore = sessionStorage.getItem('loginPageAnimated');
    if (hasAnimatedBefore) {
      setHasAnimated(true);
    } else {
      setHasAnimated(true);
      sessionStorage.setItem('loginPageAnimated', 'true');
    }
  }, []);

  ///google handlers
  
  const handleGoogle2 = useGoogleLogin({
    flow: "auth-code", // Use "auth-code" flow instead of "implicit"
    redirect_uri: 'http://localhost:3001/api/auth/google/callback',
    onSuccess: (response) => {
        console.log("Google Auth Code:", response.code);
        //dispatch(loginWithGoogle(response.code));
    },
    onError: (error) => console.error("Google Login Failed:", error),
  });

  const handleGoogle = async() => {
    try{
      const url = await googleApi.getGoogleLoginUrl(); // Send to backend
      const popup = window.open(url, "Google Login", "width=500,height=600");
      const checkPopup = setInterval(async () => {
        if (!popup || popup.closed) {
          clearInterval(checkPopup);
          
          // Get auth details from backend (assumes backend stores in session or cookie)
          console.log(popup)
          //const response = await callback();
          
          // Dispatch login action to store user data in Redux
          //dispatch(loginWithGoogle(response));

          console.log("Google Login Success:");
        }
      }, 1000);
    }catch(error){
      console.log("Google login error: ",error)
    }
  };

  const handleError = () => {
    console.error("Google Sign-In failed");
  };

  //password reset handlers
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Enhanced sign-in handler with rate limiting
  const onSubmit = async (data) => {
    if (isRateLimited) {
      return;
    }

    try {
      setLoginAttempts(prev => prev + 1);
      
      // Simple rate limiting (5 attempts per session)
      if (loginAttempts >= 4) {
        setIsRateLimited(true);
        setTimeout(() => {
          setIsRateLimited(false);
          setLoginAttempts(0);
        }, 300000); // 5 minutes
        return;
      }

      const result = await dispatch(login(data));
      if (result.meta?.requestStatus === "fulfilled") {
        setLoginAttempts(0);
        // Don't navigate here - let the useEffect handle it when user state updates
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Reset rate limiting on successful navigation
  useEffect(() => {
    if (user) {
      setLoginAttempts(0);
      setIsRateLimited(false);
      // Clear animation flag on successful login
      sessionStorage.removeItem('loginPageAnimated');
    }
  }, [user]);

  // Don't render the login form if user is already authenticated
  if (user && isAuthenticated) {
    return <LoadingScreen caption='Redirecting to dashboard...' />;
  }

  return (
    <div>
      {loading || isNavigating? <LoadingScreen caption='Signing in...' /> : (
      <SignInContainer direction="column" justifyContent="space-between">
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <Card variant="outlined">
          <LogoContainer>
            <UmansLogoStyled style={{ width: 80, height: 80 }} />
          </LogoContainer>
          <PageTitle component="h1">
            Welcome Back
          </PageTitle>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ 
              textAlign: 'center', 
              mb: 3,
              animation: hasAnimated ? 'none' : `${fadeInUp} 0.4s ease-out 0.2s both`
            }}
          >
            Sign in to your account to continue
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  borderRadius: '12px',
                  animation: `${fadeInUp} 0.2s ease-out`,
                  mb: 2,
                  '& .MuiAlert-message': {
                    fontWeight: 500
                  }
                }}
              >
                {error}
              </Alert>
            )}
            
            {isRateLimited && (
              <Alert 
                id="rate-limit-message"
                severity="warning" 
                role="alert"
                sx={{ 
                  borderRadius: '12px',
                  animation: `${fadeInUp} 0.2s ease-out`,
                  mb: 2,
                  '& .MuiAlert-message': {
                    fontWeight: 500
                  }
                }}
              >
                Too many login attempts. Please wait 5 minutes before trying again.
              </Alert>
            )}
            
            {loginAttempts > 0 && loginAttempts < 4 && (
              <Alert 
                severity="info" 
                sx={{ 
                  borderRadius: '12px',
                  animation: `${fadeInUp} 0.2s ease-out`,
                  mb: 2,
                  '& .MuiAlert-message': {
                    fontWeight: 500
                  }
                }}
              >
                {loginAttempts} of 5 attempts used. {5 - loginAttempts} attempts remaining.
              </Alert>
            )}
            
            <FormControl sx={{ animation: hasAnimated ? 'none' : `${fadeInUp} 0.3s ease-out 0.3s both` }}>
              <FormLabel htmlFor="email" sx={{ fontWeight: 600, mb: 1 }}>
                Email Address
              </FormLabel>
              <StyledTextField
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={errors.email ? 'error' : 'primary'}
                aria-describedby={errors.email ? "email-error" : undefined}
                aria-invalid={!!errors.email}
                inputProps={{
                  'aria-label': 'Email address',
                  'aria-required': 'true'
                }}
              />
            </FormControl>
            
            <FormControl sx={{ animation: hasAnimated ? 'none' : `${fadeInUp} 0.3s ease-out 0.4s both` }}>
              <FormLabel htmlFor="password" sx={{ fontWeight: 600, mb: 1 }}>
                Password
              </FormLabel>
              <StyledTextField
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                name="password"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={errors.password ? 'error' : 'primary'}
                aria-describedby={errors.password ? "password-error" : undefined}
                aria-invalid={!!errors.password}
                inputProps={{
                  'aria-label': 'Password',
                  'aria-required': 'true'
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        tabIndex={0}
                        sx={{ 
                          color: 'text.secondary',
                          '&:hover': { color: 'primary.main' },
                          '&:focus': { 
                            outline: '2px solid',
                            outlineColor: 'primary.main',
                            outlineOffset: '2px'
                          }
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              animation: hasAnimated ? 'none' : `${fadeInUp} 0.3s ease-out 0.5s both`
            }}>
              <FormControlLabel
                control={
                  <Checkbox 
                    {...register("remember")} 
                    color="primary" 
                    sx={{ 
                      '&.Mui-checked': {
                        color: 'primary.main',
                      }
                    }}
                  />
                }
                label="Remember me"
                sx={{ 
                  '& .MuiFormControlLabel-label': { 
                    fontWeight: 500,
                    fontSize: '0.9rem'
                  }
                }}
              />
              <Link
                component="button"
                type="button"
                onClick={handleClickOpen}
                variant="body2"
                sx={{ 
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: 'primary.main',
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                Forgot password?
              </Link>
            </Box>
            
            <ForgotPassword open={open} handleClose={handleClose} />
            
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading || isRateLimited}
              aria-describedby={isRateLimited ? "rate-limit-message" : undefined}
              sx={{ 
                animation: hasAnimated ? 'none' : `${fadeInUp} 0.3s ease-out 0.6s both`,
                mt: 2,
                '&:focus': {
                  outline: '3px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: '2px'
                }
              }}
            >
              {loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} color="inherit" aria-hidden="true" />
                  <span>Signing in...</span>
                </Box>
              ) : isRateLimited ? (
                "Rate Limited"
              ) : (
                "Sign In"
              )}
            </StyledButton>
          </Box>
          <StyledDivider>or continue with</StyledDivider>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2,
            animation: hasAnimated ? 'none' : `${fadeInUp} 0.3s ease-out 0.7s both`
          }}>
            <SocialButton
              fullWidth
              variant="outlined"
              onClick={handleGoogle2}
              startIcon={<GoogleIcon />}
              sx={{ 
                '&:hover': {
                  borderColor: '#4285f4',
                  backgroundColor: '#4285f410',
                }
              }}
            >
              Continue with Google
            </SocialButton>
            
            <SocialButton
              fullWidth
              variant="outlined"
              onClick={() => alert('Facebook login coming soon!')}
              startIcon={<FacebookIcon />}
              sx={{ 
                '&:hover': {
                  borderColor: '#1877f2',
                  backgroundColor: '#1877f210',
                }
              }}
            >
              Continue with Facebook
            </SocialButton>
            
            <Typography 
              sx={{ 
                textAlign: 'center', 
                mt: 2,
                animation: hasAnimated ? 'none' : `${fadeInUp} 0.3s ease-out 0.8s both`
              }}
            >
              Don&apos;t have an account?{' '}
              <Link
                href="/register/"
                variant="body2"
                sx={{ 
                  fontWeight: 600,
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                Create one now
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
      )}
    </div>
  );
}