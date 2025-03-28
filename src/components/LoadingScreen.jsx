import { CircularProgress, Box, Typography } from "@mui/material";

export default function LoadingScreen ({caption, fullScreen = true}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: fullScreen ? "rgba(0, 0, 0, 0.5)" : "transparent",
        color: fullScreen ? "white" : "inherit",
        width: fullScreen ? "100vw" : "100%",
        height: fullScreen ? "100vh" : "100%",
        position: fullScreen ? "fixed" : "relative",
        top: fullScreen ? 0 : "auto",
        left: fullScreen ? 0 : "auto",
        zIndex: fullScreen ? 1300 : "auto",
      }}
    >
      <CircularProgress size={60} sx={{ color: fullScreen ? "white" : "primary.main" }} />
      <Typography variant="h6" sx={{ mt: 2 }}>
        {caption}
      </Typography>
    </Box>
  );
};
