import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,

} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";


import ProfileAvatarCard from "../../components/pageComponents/profileAvatarCard";
import ProfileChangePasswordCard from "../../components/pageComponents/profileChangePasswordCard";

const Profile = () => {

  return (
    <Box sx={{ p: 3, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#333" }}>
        My Profile
      </Typography>

      <Grid container spacing={3}>
        {/* User Info + Avatar */}
        <Grid item xs={12} md={6}>
            <ProfileAvatarCard/>
        </Grid>

        {/* Change Password */}
        <Grid item xs={12} md={6}>
            <ProfileChangePasswordCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
