import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box, Alert } from "@mui/material";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
        navigate("/"); // Redirect to dashboard after login
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const result = await dispatch(login({ email, password }));
            if (result.meta.requestStatus === "fulfilled") {
                navigate("/"); // Redirect after successful login
            }
        } catch (error){
            console.log(error)
        }
    };

    return (
        <Container maxWidth="sm">
        <Box sx={{ mt: 10, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
            Login
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </Button>
            </form>
        </Box>
        </Container>
    );
};

export default Login;