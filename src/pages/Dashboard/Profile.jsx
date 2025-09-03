import React, { useState } from "react";
import {
  Box,
  Grid2,
  Typography,
  Container,
} from "@mui/material";
import { styled } from '@mui/material/styles';

import ProfileAvatarCard from "../../components/pageComponents/ProfileAvatarCard";
import ProfileChangePasswordCard from "../../components/pageComponents/ProfileChangePasswordCard";

// Enhanced styling for the profile page
const ProfileContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.background.default} 100%)`
    : `linear-gradient(135deg, ${theme.palette.grey[900]} 0%, ${theme.palette.background.default} 100%)`,
  padding: theme.spacing(4),
}));

const PageHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  textAlign: 'center',
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '2.5rem',
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
    : `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(1),
}));

const PageSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '1.1rem',
  fontWeight: 500,
}));

const Profile = () => {

  return (
    <ProfileContainer>
      <Container maxWidth="xl">
        <PageHeader>
          <PageTitle>My Profile</PageTitle>
          <PageSubtitle>Manage your account settings and personal information</PageSubtitle>
        </PageHeader>

        <Grid2 container spacing={4}>
          {/* User Info + Avatar */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <ProfileAvatarCard />
          </Grid2>

          {/* Change Password */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <ProfileChangePasswordCard />
          </Grid2>
        </Grid2>
      </Container>
    </ProfileContainer>
  );
};

export default Profile;
