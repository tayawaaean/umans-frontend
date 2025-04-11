import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,

} from "@mui/material";

const ProfileChangePasswordCard = () => {
    const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Password change submitted:", form);
    };

  return (
    <div>
        <Card sx={{ boxShadow: 3, backgroundColor: "#ffffff" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Change Password
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  fullWidth
                  margin="normal"
                  value={form.currentPassword}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="New Password"
                  name="newPassword"
                  type="password"
                  fullWidth
                  margin="normal"
                  value={form.newPassword}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Confirm New Password"
                  name="confirmPassword"
                  type="password"
                  fullWidth
                  margin="normal"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  Update Password
                </Button>
              </Box>
            </CardContent>
          </Card>
    </div>
  )
}

export default ProfileChangePasswordCard
