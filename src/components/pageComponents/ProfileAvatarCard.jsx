import React, { useState, useRef } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  Avatar,
  CircularProgress,
  Stack,
  Chip,
  Paper
} from "@mui/material";
import { styled } from '@mui/material/styles';
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SecurityIcon from "@mui/icons-material/Security";
import fileUpload from "../../utils/fileUpload";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from "../../store/slices/usersSlice";
import { updateAvatar } from "../../store/actions/userShared";

const avatarURL=import.meta.env.VITE_IMAGE_SERVER_URL

// Enhanced styling components
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '20px',
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`
    : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[900]} 100%)`,
  border: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]}`,
  boxShadow: theme.palette.mode === 'light'
    ? '0 8px 32px rgba(0, 0, 0, 0.1)'
    : '0 8px 32px rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(20px)',
  overflow: 'hidden',
}));

const AvatarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${theme.palette.primary.main}10, ${theme.palette.primary.light}05)`
    : `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.primary.dark}10)`,
  borderRadius: '16px',
  marginBottom: theme.spacing(4),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: `4px solid ${theme.palette.primary.main}20`,
  boxShadow: `0 8px 24px ${theme.palette.primary.main}30`,
  marginBottom: theme.spacing(2),
}));

const UploadButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  padding: theme.spacing(1, 2),
  fontWeight: 600,
  textTransform: 'none',
  marginBottom: theme.spacing(1),
  transition: 'all 0.3s ease',
  color: theme.palette.primary.main,
  borderColor: theme.palette.primary.main,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
  textTransform: 'none',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  boxShadow: `0 4px 16px ${theme.palette.primary.main}40`,
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
    boxShadow: `0 8px 24px ${theme.palette.primary.main}60`,
    transform: 'translateY(-2px)',
  },
}));

const InfoItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1.5),
  borderRadius: '12px',
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.background.paper} 100%)`
    : `linear-gradient(135deg, ${theme.palette.grey[900]} 0%, ${theme.palette.background.paper} 100%)`,
  border: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.mode === 'light'
      ? '0 4px 12px rgba(0, 0, 0, 0.1)'
      : '0 4px 12px rgba(0, 0, 0, 0.3)',
  },
}));

const ProfileAvatarCard = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user) || null

    //File uploading
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const handleUploadClick = () => {
      fileInputRef.current?.click();
    };
  
    const handleFileChange = (event) => {
      const selectedFile = event.target.files?.[0];
      if (selectedFile) {
        setFile(selectedFile);
      }
    };
  
    const handleSubmit = async () => {
      if (!file) return;
  
      try {
        const upload = await fileUpload(file, '/upload', setLoading, dispatch);
        dispatch(updateUser({id: user.id , data:{ avatar: upload.filePath }}));
        dispatch(updateAvatar(upload.filePath));
      } catch (error) {
        console.error('Upload error:', error);
      }
    };

    return (
      <StyledCard>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: 4, pb: 0 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 4, textAlign: 'center', color: 'text.primary' }}>
              User Information
            </Typography>
          </Box>

          <AvatarContainer>
            <StyledAvatar
              src={`${avatarURL}${user?.avatar}`}
              alt="User Avatar"
            />
            
            <Stack spacing={2} alignItems="center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              
              <UploadButton 
                variant="outlined" 
                onClick={handleUploadClick}
                startIcon={<PhotoCameraIcon />}
              >
                Choose File
              </UploadButton>
              
              {file && (
                <Chip 
                  label={file.name} 
                  color="primary" 
                  variant="outlined"
                  sx={{ maxWidth: 200, '& .MuiChip-label': { overflow: 'hidden', textOverflow: 'ellipsis' } }}
                />
              )}
              
              <Box>
                {loading ? (
                  <CircularProgress size={24} />
                ) : (
                  <SubmitButton
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!file || loading}
                  >
                    Upload Avatar
                  </SubmitButton>
                )}
              </Box>
            </Stack>
          </AvatarContainer>

          <Box sx={{ p: 4 }}>
            <Stack spacing={3}>
              <InfoItem>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <PersonIcon color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      Full Name
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {user?.firstName} {user?.lastName}
                    </Typography>
                  </Box>
                </Stack>
              </InfoItem>

              <InfoItem>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <EmailIcon color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      Email Address
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {user?.email}
                    </Typography>
                  </Box>
                </Stack>
              </InfoItem>

              <InfoItem>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <PhoneIcon color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      Mobile Number
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {user?.mobileNo || 'Not provided'}
                    </Typography>
                  </Box>
                </Stack>
              </InfoItem>

              <InfoItem>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <SecurityIcon color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      Role
                    </Typography>
                    <Chip 
                      label={user?.role} 
                      color="primary" 
                      variant="filled"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                </Stack>
              </InfoItem>
            </Stack>
          </Box>
        </CardContent>
      </StyledCard>
    )
}

export default ProfileAvatarCard
