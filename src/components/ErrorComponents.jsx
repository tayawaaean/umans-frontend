import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Alert,
  AlertTitle,
  IconButton,
  Collapse,
  Chip,
  Stack
} from '@mui/material';
import {
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  CheckCircle as SuccessIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  BugReport as BugIcon,
  WifiOff as OfflineIcon,
  CloudOff as CloudOffIcon
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';

// Animations
const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const ErrorCard = styled(Card)(({ theme, severity = 'error' }) => ({
  borderRadius: theme.spacing(2),
  border: `1px solid ${
    severity === 'error' ? theme.palette.error.main :
    severity === 'warning' ? theme.palette.warning.main :
    severity === 'info' ? theme.palette.info.main :
    theme.palette.success.main
  }20`,
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${
        severity === 'error' ? theme.palette.error.main :
        severity === 'warning' ? theme.palette.warning.main :
        severity === 'info' ? theme.palette.info.main :
        theme.palette.success.main
      }05 100%)`
    : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${
        severity === 'error' ? theme.palette.error.main :
        severity === 'warning' ? theme.palette.warning.main :
        severity === 'info' ? theme.palette.info.main :
        theme.palette.success.main
      }10 100%)`,
  boxShadow: theme.palette.mode === 'light'
    ? `0 8px 32px ${
        severity === 'error' ? theme.palette.error.main :
        severity === 'warning' ? theme.palette.warning.main :
        severity === 'info' ? theme.palette.info.main :
        theme.palette.success.main
      }15`
    : `0 8px 32px ${
        severity === 'error' ? theme.palette.error.main :
        severity === 'warning' ? theme.palette.warning.main :
        severity === 'info' ? theme.palette.info.main :
        theme.palette.success.main
      }25`,
  animation: severity === 'error' ? `${shake} 0.5s ease-in-out` : `${fadeInUp} 0.5s ease-out`,
  backdropFilter: 'blur(10px)',
  overflow: 'visible',
}));

const ErrorIconWrapper = styled(Box)(({ theme, severity }) => ({
  width: 48,
  height: 48,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: `${
    severity === 'error' ? theme.palette.error.main :
    severity === 'warning' ? theme.palette.warning.main :
    severity === 'info' ? theme.palette.info.main :
    theme.palette.success.main
  }15`,
  color: severity === 'error' ? theme.palette.error.main :
         severity === 'warning' ? theme.palette.warning.main :
         severity === 'info' ? theme.palette.info.main :
         theme.palette.success.main,
  animation: `${pulse} 2s infinite`,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(1, 2),
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 6px 20px ${theme.palette.primary.main}30`,
  },
}));

const ErrorDetails = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light'
    ? theme.palette.grey[50]
    : theme.palette.grey[900],
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  border: `1px solid ${theme.palette.mode === 'light'
    ? theme.palette.grey[200]
    : theme.palette.grey[800]}`,
  fontFamily: 'monospace',
  fontSize: '0.875rem',
  overflow: 'auto',
  maxHeight: 200,
}));

// Error State Components
export const ErrorState = ({
  title = "Something went wrong",
  message = "We encountered an unexpected error. Please try again.",
  severity = "error",
  onRetry,
  onClose,
  showDetails = false,
  details,
  icon,
  actions = []
}) => {
  const [showErrorDetails, setShowErrorDetails] = React.useState(false);

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'error': return <ErrorIcon />;
      case 'warning': return <WarningIcon />;
      case 'info': return <InfoIcon />;
      case 'success': return <SuccessIcon />;
      default: return <ErrorIcon />;
    }
  };

  return (
    <ErrorCard severity={severity} elevation={0}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <ErrorIconWrapper severity={severity}>
            {icon || getSeverityIcon(severity)}
          </ErrorIconWrapper>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              {title}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {message}
            </Typography>

            {details && (
              <Button
                size="small"
                onClick={() => setShowErrorDetails(!showErrorDetails)}
                startIcon={showErrorDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                sx={{ mb: 2, textTransform: 'none' }}
              >
                {showErrorDetails ? 'Hide Details' : 'Show Details'}
              </Button>
            )}

            <Collapse in={showErrorDetails}>
              <ErrorDetails>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                  Error Details:
                </Typography>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {typeof details === 'string' ? details : JSON.stringify(details, null, 2)}
                </pre>
              </ErrorDetails>
            </Collapse>

            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 2 }}>
              {onRetry && (
                <ActionButton
                  variant="contained"
                  size="small"
                  onClick={onRetry}
                  startIcon={<RefreshIcon />}
                >
                  Try Again
                </ActionButton>
              )}

              {actions.map((action, index) => (
                <ActionButton
                  key={index}
                  variant={action.variant || "outlined"}
                  size="small"
                  onClick={action.onClick}
                  startIcon={action.icon}
                >
                  {action.label}
                </ActionButton>
              ))}
            </Stack>
          </Box>

          {onClose && (
            <IconButton
              size="small"
              onClick={onClose}
              sx={{
                color: 'text.secondary',
                '&:hover': { color: 'text.primary' }
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </ErrorCard>
  );
};

// Network Error Component
export const NetworkError = ({ onRetry }) => (
  <ErrorState
    title="Connection Lost"
    message="Unable to connect to the server. Please check your internet connection and try again."
    severity="warning"
    icon={<OfflineIcon />}
    onRetry={onRetry}
  />
);

// Server Error Component
export const ServerError = ({ onRetry, statusCode }) => (
  <ErrorState
    title="Server Error"
    message={`The server encountered an error (${statusCode || 'Unknown'}). Our team has been notified. Please try again later.`}
    severity="error"
    icon={<CloudOffIcon />}
    onRetry={onRetry}
    actions={[
      {
        label: "Report Issue",
        icon: <BugIcon />,
        onClick: () => window.open('mailto:support@example.com?subject=Server Error Report', '_blank')
      }
    ]}
  />
);

// Validation Error Component
export const ValidationError = ({ errors, onDismiss }) => (
  <ErrorCard severity="warning" elevation={0}>
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <ErrorIconWrapper severity="warning">
          <WarningIcon />
        </ErrorIconWrapper>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Validation Error
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Please correct the following issues:
          </Typography>

          <Stack spacing={1}>
            {errors.map((error, index) => (
              <Alert
                key={index}
                severity="warning"
                variant="outlined"
                sx={{ borderRadius: 2 }}
              >
                <AlertTitle sx={{ fontWeight: 600, mb: 0 }}>
                  {error.field}
                </AlertTitle>
                {error.message}
              </Alert>
            ))}
          </Stack>
        </Box>

        {onDismiss && (
          <IconButton size="small" onClick={onDismiss}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
    </CardContent>
  </ErrorCard>
);

// Toast Notification Component
export const ToastNotification = ({
  message,
  severity = "info",
  onClose,
  action,
  autoHideDuration = 6000
}) => {
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    if (autoHideDuration > 0) {
      const timer = setTimeout(() => setOpen(false), autoHideDuration);
      return () => clearTimeout(timer);
    }
  }, [autoHideDuration]);

  if (!open) return null;

  return (
    <Collapse in={open}>
      <Alert
        severity={severity}
        variant="filled"
        action={
          <>
            {action}
            {onClose && (
              <IconButton
                size="small"
                onClick={() => {
                  setOpen(false);
                  onClose();
                }}
                sx={{ color: 'inherit' }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </>
        }
        sx={{
          mb: 2,
          borderRadius: 2,
          boxShadow: (theme) => `0 4px 12px ${theme.palette[severity]?.main}30`,
          '& .MuiAlert-message': {
            fontWeight: 500
          }
        }}
      >
        {message}
      </Alert>
    </Collapse>
  );
};

// Error Boundary Component
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to external service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh',
            p: 3
          }}
        >
          <ErrorState
            title="Application Error"
            message="Something went wrong in the application. This error has been logged and our team will investigate."
            severity="error"
            icon={<BugIcon />}
            onRetry={this.handleRetry}
            showDetails={process.env.NODE_ENV === 'development'}
            details={this.state.error?.toString()}
            actions={[
              {
                label: "Reload Page",
                icon: <RefreshIcon />,
                onClick: () => window.location.reload()
              }
            ]}
          />
        </Box>
      );
    }

    return this.props.children;
  }
}

export default {
  ErrorState,
  NetworkError,
  ServerError,
  ValidationError,
  ToastNotification,
  ErrorBoundary
};
