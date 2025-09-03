import Grid from '@mui/material/Grid2';
import { Alert, Typography, Box, Button, Stack,Divider, TextField, FormLabel, FormControl, Link, CssBaseline, Fade, Zoom } from '@mui/material';
import MuiCard from '@mui/material/Card';
import { styled, keyframes } from '@mui/material/styles';
import AppTheme from '../../shared-theme/AppTheme';
import ColorModeSelect from '../../shared-theme/ColorModeSelect';
import { GoogleIcon, FacebookIcon, SitemarkIcon, UmansLogoStyled } from '../../components/CustomIcons';

import UmansLogo from '../../assets/umans.svg?react';

//import logic components from react and redux
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//import reducer functions
import { createUser } from "../../store/slices/usersSlice";


//import validation resources
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../utils/validationSchema";


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

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

export const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(5),
  gap: theme.spacing(4),
  margin: 'auto',
  position: 'relative',
  overflow: 'hidden',
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, rgba(255,255,255,0.95) 100%)`
    : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, rgba(33,33,33,0.95) 100%)`,
  backdropFilter: 'blur(20px)',
  border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'}`,
  [theme.breakpoints.up('sm')]: {
    maxWidth: '700px',
    padding: theme.spacing(6),
  },
  boxShadow: theme.palette.mode === 'light'
    ? '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05)'
    : '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
  borderRadius: theme.spacing(3),
  animation: `${fadeInUp} 0.6s ease-out`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, ${theme.palette.mode === 'light' ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)'}, transparent)`,
    animation: `${shimmer} 3s infinite`,
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.mode === 'light'
      ? '0 35px 60px -12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)'
      : '0 35px 60px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.15)',
  },
}));

export const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  width: '100vw',
  padding: theme.spacing(2),
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'light'
      ? `linear-gradient(135deg, ${theme.palette.secondary.light}10 0%, ${theme.palette.primary.light}15 50%, ${theme.palette.background.default} 100%)`
      : `linear-gradient(135deg, ${theme.palette.secondary.dark}15 0%, ${theme.palette.primary.dark}20 50%, ${theme.palette.background.default} 100%)`,
    zIndex: -2,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '15%',
    right: '10%',
    width: '250px',
    height: '250px',
    background: `radial-gradient(circle, ${theme.palette.secondary.main}15 0%, transparent 70%)`,
    borderRadius: '50%',
    filter: 'blur(30px)',
    zIndex: -1,
    animation: `${fadeInUp} 2s ease-out`,
  },
}));

export default function SignUp(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {message, loading, error } = useSelector((state) => state.users);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    //delete data.confirmPassword;
    try{ 
      const result = await dispatch(createUser(data))
        if (result.meta.requestStatus === "fulfilled") {
           navigate("/login")
        }
    } catch (error){
        console.log(error)
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" maxWidth="calc((1 - var(--template-frame-width, 0)) * 100dvw)">
        <ColorModeSelect
          sx={{
            position: 'fixed',
            top: '1.5rem',
            right: '1.5rem',
            zIndex: 1000,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            padding: '0.5rem',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              transform: 'scale(1.05)',
            }
          }}
        />
        <Zoom in={true} style={{ transitionDelay: '200ms' }}>
          <Card variant="outlined">
            <Fade in={true} style={{ transitionDelay: '400ms' }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={3}
                sx={{
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-10px',
                    width: '60px',
                    height: '3px',
                    background: theme => `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    borderRadius: '2px',
                  }
                }}
              >
                <UmansLogoStyled
                  style={{
                    width: 80,
                    height: 80,
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
              </Box>
            </Fade>

            <Fade in={true} style={{ transitionDelay: '600ms' }}>
              <Typography
                component="h1"
                variant="h4"
                sx={{
                  width: '100%',
                  fontSize: 'clamp(2.2rem, 8vw, 2.5rem)',
                  fontWeight: 700,
                  textAlign: 'center',
                  background: theme => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                Create Account
              </Typography>
            </Fade>

            <Fade in={true} style={{ transitionDelay: '800ms' }}>
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
                  color: 'text.secondary',
                  mb: 3,
                  fontSize: '1rem',
                }}
              >
                Join us and start managing your users today
              </Typography>
            </Fade>

            <Fade in={true} style={{ transitionDelay: '1000ms' }}>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 3 }}
              >
                <Grid container spacing={3} columns={12}>
                  {/* firstName Field */}
                  <Grid size={{xs:12, sm:6}}>
                    <FormControl fullWidth>
                      <FormLabel
                        htmlFor="firstName"
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.95rem',
                          mb: 1,
                          color: 'text.primary'
                        }}
                      >
                        First Name
                      </FormLabel>
                      <TextField
                        {...register("firstName")}
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        placeholder="Enter your first name"
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                        color={!!errors.firstName ? 'error' : 'primary'}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'background.paper',
                            borderRadius: '12px',
                            transition: 'all 0.3s ease',
                            '& fieldset': {
                              borderColor: 'rgba(0, 0, 0, 0.1)',
                              borderWidth: '2px',
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                              borderWidth: '2px',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main',
                              borderWidth: '3px',
                              boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.1)',
                            },
                          },
                          '& .MuiInputBase-input': {
                            fontSize: '1rem',
                            padding: '16px 14px',
                          },
                        }}
                      />
                    </FormControl>
                  </Grid>
                  {/*lastName field */}
                  <Grid size={{xs:12, sm:6}}>
                    <FormControl fullWidth>
                      <FormLabel
                        htmlFor="lastName"
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.95rem',
                          mb: 1,
                          color: 'text.primary'
                        }}
                      >
                        Last Name
                      </FormLabel>
                      <TextField
                        {...register("lastName")}
                        autoComplete="family-name"
                        name="lastName"
                        required
                        fullWidth
                        id="lastName"
                        placeholder="Enter your last name"
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        color={!!errors.lastName ? 'error' : 'primary'}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'background.paper',
                            borderRadius: '12px',
                            transition: 'all 0.3s ease',
                            '& fieldset': {
                              borderColor: 'rgba(0, 0, 0, 0.1)',
                              borderWidth: '2px',
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                              borderWidth: '2px',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main',
                              borderWidth: '3px',
                              boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.1)',
                            },
                          },
                          '& .MuiInputBase-input': {
                            fontSize: '1rem',
                            padding: '16px 14px',
                          },
                        }}
                      />
                    </FormControl>
                  </Grid>
                  {/* Email Field */}
                  <Grid size={{xs:12, sm:12}}>
                    <FormControl fullWidth>
                      <FormLabel
                        htmlFor="email"
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.95rem',
                          mb: 1,
                          color: 'text.primary'
                        }}
                      >
                        Email Address
                      </FormLabel>
                      <TextField
                        {...register("email")}
                        required
                        fullWidth
                        id="email"
                        placeholder="Enter your email address"
                        name="email"
                        autoComplete="email"
                        variant="outlined"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        color={errors.email ? 'error' : 'primary'}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'background.paper',
                            borderRadius: '12px',
                            transition: 'all 0.3s ease',
                            '& fieldset': {
                              borderColor: 'rgba(0, 0, 0, 0.1)',
                              borderWidth: '2px',
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                              borderWidth: '2px',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main',
                              borderWidth: '3px',
                              boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.1)',
                            },
                          },
                          '& .MuiInputBase-input': {
                            fontSize: '1rem',
                            padding: '16px 14px',
                          },
                        }}
                      />
                    </FormControl>
                  </Grid>
                  {/*mobile number field */}
                  <Grid size={{xs:12, sm:6}}>
                    <FormControl fullWidth>
                      <FormLabel
                        htmlFor="mobileNo"
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.95rem',
                          mb: 1,
                          color: 'text.primary'
                        }}
                      >
                        Mobile Number
                      </FormLabel>
                      <TextField
                        {...register("mobileNo")}
                        autoComplete="phone"
                        name="mobileNo"
                        required
                        fullWidth
                        id="mobileNo"
                        placeholder="Enter your mobile number"
                        error={!!errors.mobileNo}
                        helperText={errors.mobileNo?.message}
                        color={!!errors.mobileNo ? 'error' : 'primary'}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'background.paper',
                            borderRadius: '12px',
                            transition: 'all 0.3s ease',
                            '& fieldset': {
                              borderColor: 'rgba(0, 0, 0, 0.1)',
                              borderWidth: '2px',
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                              borderWidth: '2px',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main',
                              borderWidth: '3px',
                              boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.1)',
                            },
                          },
                          '& .MuiInputBase-input': {
                            fontSize: '1rem',
                            padding: '16px 14px',
                          },
                        }}
                      />
                    </FormControl>
                  </Grid>
                  {/*Office field */}
                  <Grid size={{xs:12, sm:6}}>
                    <FormControl fullWidth>
                      <FormLabel
                        htmlFor="office"
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.95rem',
                          mb: 1,
                          color: 'text.primary'
                        }}
                      >
                        Office/Unit
                      </FormLabel>
                      <TextField
                        {...register("office")}
                        autoComplete="office"
                        name="office"
                        required
                        fullWidth
                        id="office"
                        placeholder="Enter your office/unit"
                        error={!!errors.office}
                        helperText={errors.office?.message}
                        color={!!errors.office ? 'error' : 'primary'}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'background.paper',
                            borderRadius: '12px',
                            transition: 'all 0.3s ease',
                            '& fieldset': {
                              borderColor: 'rgba(0, 0, 0, 0.1)',
                              borderWidth: '2px',
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                              borderWidth: '2px',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main',
                              borderWidth: '3px',
                              boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.1)',
                            },
                          },
                          '& .MuiInputBase-input': {
                            fontSize: '1rem',
                            padding: '16px 14px',
                          },
                        }}
                      />
                    </FormControl>
                  </Grid>
                  {/* Password */}
                  <Grid size={{xs:12, sm:6}}>
                    <FormControl fullWidth>
                      <FormLabel
                        htmlFor="password"
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.95rem',
                          mb: 1,
                          color: 'text.primary'
                        }}
                      >
                        Password
                      </FormLabel>
                      <TextField
                        {...register("password")}
                        required
                        fullWidth
                        name="password"
                        placeholder="Create a strong password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        variant="outlined"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        color={errors.password ? 'error' : 'primary'}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'background.paper',
                            borderRadius: '12px',
                            transition: 'all 0.3s ease',
                            '& fieldset': {
                              borderColor: 'rgba(0, 0, 0, 0.1)',
                              borderWidth: '2px',
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                              borderWidth: '2px',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main',
                              borderWidth: '3px',
                              boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.1)',
                            },
                          },
                          '& .MuiInputBase-input': {
                            fontSize: '1rem',
                            padding: '16px 14px',
                          },
                        }}
                      />
                    </FormControl>
                  </Grid>
                  {/* Reenter password */}
                  <Grid size={{xs:12, sm:6}}>
                    <FormControl fullWidth>
                      <FormLabel
                        htmlFor="confirmPassword"
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.95rem',
                          mb: 1,
                          color: 'text.primary'
                        }}
                      >
                        Confirm Password
                      </FormLabel>
                      <TextField
                        {...register("confirmPassword")}
                        required
                        fullWidth
                        name="confirmPassword"
                        placeholder="Re-enter your password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
                        variant="outlined"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        color={errors.confirmPassword ? 'error' : 'primary'}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'background.paper',
                            borderRadius: '12px',
                            transition: 'all 0.3s ease',
                            '& fieldset': {
                              borderColor: 'rgba(0, 0, 0, 0.1)',
                              borderWidth: '2px',
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                              borderWidth: '2px',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'primary.main',
                              borderWidth: '3px',
                              boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.1)',
                            },
                          },
                          '& .MuiInputBase-input': {
                            fontSize: '1rem',
                            padding: '16px 14px',
                          },
                        }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{
                    height: '56px',
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    background: theme => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    boxShadow: '0 4px 14px 0 rgba(25, 118, 210, 0.3)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      background: theme => `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                      boxShadow: '0 6px 20px 0 rgba(25, 118, 210, 0.4)',
                      transform: 'translateY(-2px)',
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                    },
                    '&.Mui-disabled': {
                      background: 'grey.400',
                      color: 'grey.600',
                    }
                  }}
                >
                  {loading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CircularProgress size={20} color="inherit" />
                      Creating account...
                    </Box>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </Box>
            </Fade>

            <Fade in={true} style={{ transitionDelay: '1200ms' }}>
              <Divider
                sx={{
                  my: 4,
                  '&::before, &::after': {
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                  }
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    px: 2,
                    fontWeight: 500
                  }}
                >
                  or continue with
                </Typography>
              </Divider>
            </Fade>

            <Fade in={true} style={{ transitionDelay: '1400ms' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => alert('Sign up with Google')}
                  startIcon={<GoogleIcon />}
                  sx={{
                    height: '48px',
                    borderRadius: '12px',
                    border: '2px solid',
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    color: 'text.primary',
                    fontWeight: 600,
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'rgba(0, 0, 0, 0.2)',
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    }
                  }}
                >
                  Continue with Google
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => alert('Sign up with Facebook')}
                  startIcon={<FacebookIcon />}
                  sx={{
                    height: '48px',
                    borderRadius: '12px',
                    border: '2px solid',
                    borderColor: '#1877f2',
                    color: '#1877f2',
                    fontWeight: 600,
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#166fe5',
                      backgroundColor: '#1877f2',
                      color: 'white',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 12px rgba(24, 119, 242, 0.3)',
                    }
                  }}
                >
                  Continue with Facebook
                </Button>
              </Box>
            </Fade>

            <Fade in={true} style={{ transitionDelay: '1600ms' }}>
              <Typography
                sx={{
                  textAlign: 'center',
                  mt: 4,
                  color: 'text.secondary',
                  fontSize: '0.95rem'
                }}
              >
                Already have an account?{' '}
                <Link
                  href="/login/"
                  sx={{
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: 'primary.main',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: 'primary.dark',
                      textDecoration: 'underline',
                    }
                  }}
                >
                  Sign in instead
                </Link>
              </Typography>
            </Fade>
          </Card>
        </Zoom>
      </SignUpContainer>
    </AppTheme>
  );
}
