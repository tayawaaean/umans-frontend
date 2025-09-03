import React from "react";
import { CircularProgress, Box, Typography, LinearProgress, Skeleton, Fade, Grow } from "@mui/material";
import { styled, keyframes } from '@mui/material/styles';

// Enhanced animations
const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

// Styled components
const LoadingContainer = styled(Box)(({ theme, fullScreen }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: fullScreen ? "fixed" : "relative",
  top: fullScreen ? 0 : "auto",
  left: fullScreen ? 0 : "auto",
  width: fullScreen ? "100vw" : "100%",
  height: fullScreen ? "100vh" : "100%",
  zIndex: fullScreen ? 1400 : "auto",
  background: fullScreen
    ? theme.palette.mode === 'light'
      ? 'rgba(255, 255, 255, 0.95)'
      : 'rgba(18, 18, 18, 0.95)'
    : 'transparent',
  backdropFilter: fullScreen ? 'blur(8px)' : 'none',
  transition: 'all 0.3s ease-in-out',
}));

const LoadingRing = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  border: `3px solid ${theme.palette.mode === 'light'
    ? theme.palette.grey[200]
    : theme.palette.grey[700]}`,
  borderTop: `3px solid ${theme.palette.primary.main}`,
  borderRadius: '50%',
  animation: `${rotate} 1s linear infinite`,
  marginBottom: theme.spacing(2),
}));

const LoadingDots = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.5),
  '& > div': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    animation: `${pulse} 1.4s ease-in-out infinite both`,
    '&:nth-of-type(1)': { animationDelay: '-0.32s' },
    '&:nth-of-type(2)': { animationDelay: '-0.16s' },
    '&:nth-of-type(3)': { animationDelay: '0s' },
  },
}));

const ShimmerSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  background: theme.palette.mode === 'light'
    ? `linear-gradient(90deg, ${theme.palette.grey[200]} 25%, ${theme.palette.grey[100]} 50%, ${theme.palette.grey[200]} 75%)`
    : `linear-gradient(90deg, ${theme.palette.grey[700]} 25%, ${theme.palette.grey[600]} 50%, ${theme.palette.grey[700]} 75%)`,
  backgroundSize: '200px 100%',
  animation: `${shimmer} 1.5s infinite`,
}));

const LoadingCaption = styled(Typography)(({ theme, fullScreen }) => ({
  marginTop: theme.spacing(2),
  color: fullScreen
    ? theme.palette.text.primary
    : theme.palette.text.secondary,
  fontWeight: 500,
  textAlign: 'center',
  animation: `${pulse} 2s ease-in-out infinite`,
}));

// Skeleton loading components
export const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <Box sx={{ width: '100%' }}>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <Box
        key={rowIndex}
        sx={{
          display: 'flex',
          gap: 2,
          mb: 2,
          p: 2,
          alignItems: 'center'
        }}
      >
        <ShimmerSkeleton variant="circular" width={40} height={40} />
        {Array.from({ length: columns - 1 }).map((_, colIndex) => (
          <Box key={colIndex} sx={{ flex: 1 }}>
            <ShimmerSkeleton variant="text" height={20} sx={{ mb: 1 }} />
            <ShimmerSkeleton variant="text" width="60%" height={16} />
          </Box>
        ))}
      </Box>
    ))}
  </Box>
);

export const CardSkeleton = ({ count = 3 }) => (
  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
    {Array.from({ length: count }).map((_, index) => (
      <Box key={index} sx={{ flex: '1 1 300px', minWidth: 250 }}>
        <ShimmerSkeleton variant="rectangular" height={200} sx={{ mb: 2, borderRadius: 2 }} />
        <ShimmerSkeleton variant="text" height={24} sx={{ mb: 1 }} />
        <ShimmerSkeleton variant="text" width="80%" height={20} sx={{ mb: 1 }} />
        <ShimmerSkeleton variant="text" width="60%" height={20} />
      </Box>
    ))}
  </Box>
);

export default function LoadingScreen({
  caption = "Loading...",
  fullScreen = true,
  size = 60,
  hideCaption = false,
  variant = "spinner", // "spinner", "dots", "ring", "linear"
  showSkeleton = false,
  skeletonType = "table"
}) {
  const renderLoader = () => {
    switch (variant) {
      case "dots":
        return <LoadingDots />;
      case "ring":
        return <LoadingRing />;
      case "linear":
        return (
          <Box sx={{ width: '100%', maxWidth: 300 }}>
            <LinearProgress
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: (theme) => theme.palette.mode === 'light'
                  ? theme.palette.grey[200]
                  : theme.palette.grey[700],
                '& .MuiLinearProgress-bar': {
                  borderRadius: 3,
                  background: (theme) => `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                },
              }}
            />
          </Box>
        );
      default:
        return (
          <Grow in timeout={300}>
            <CircularProgress
              size={size}
              thickness={4}
              sx={{
                color: (theme) => theme.palette.primary.main,
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round',
                },
              }}
            />
          </Grow>
        );
    }
  };

  const renderSkeleton = () => {
    if (!showSkeleton) return null;

    switch (skeletonType) {
      case "card":
        return <CardSkeleton />;
      case "table":
      default:
        return <TableSkeleton />;
    }
  };

  return (
    <Fade in timeout={200}>
      <LoadingContainer fullScreen={fullScreen}>
        {renderLoader()}

        {!hideCaption && caption && (
          <LoadingCaption variant="body2" fullScreen={fullScreen}>
            {caption}
          </LoadingCaption>
        )}

        {showSkeleton && (
          <Box sx={{ mt: 4, width: '100%', maxWidth: 800 }}>
            {renderSkeleton()}
          </Box>
        )}
      </LoadingContainer>
    </Fade>
  );
};
