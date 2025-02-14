import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../../shared-theme/AppTheme';
import ColorModeSelect from '../../shared-theme/ColorModeSelect';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from '../../components/CustomIcons';

//import custom styling from SignIn
import {Card, SignInContainer} from './SignIn'

//import logic components from react and redux
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//import reducer functions
import { login } from "../../store/slices/authSlice";

//import validation resources
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../utils/validationSchema";

export default function SignUp(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    console.log(data)  
    try{
        
      //const result = await dispatch(login(data)).unwrap();
        //if (result.meta.requestStatus === "fulfilled") {
        //    navigate("/"); // Redirect after successful login
        //}
    } catch (error){
        console.log(error)
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <TextField
                {...register("firstName")}
                autoComplete="firstName"
                name="firstName"
                required
                fullWidth
                id="firstName"
                placeholder="Raymart"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                color={!!errors.firstName ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <TextField
                {...register("lastName")}
                autoComplete="lastName"
                name="lastName"
                required
                fullWidth
                id="lastName"
                placeholder="Villena"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                color={!!errors.lastName ? 'error' : 'primary'}
                />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                {...register("email")}
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
                color={errors.email ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                {...register("password")}
                required
                fullWidth
                name="password"
                placeholder="••••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password?.message}
                color={errors.password ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="confirmPassword"> Re-enter Password</FormLabel>
              <TextField
                {...register("confirmPassword")}
                required
                fullWidth
                name="confirmPassword"
                placeholder="••••••••"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                variant="outlined"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                color={errors.confirmPassword ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive updates via email."
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign up"}
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Google')}
              startIcon={<GoogleIcon />}
            >
              Sign up with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Facebook')}
              startIcon={<FacebookIcon />}
            >
              Sign up with Facebook
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link
                href="/login/"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
