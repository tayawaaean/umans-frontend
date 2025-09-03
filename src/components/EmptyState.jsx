import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Avatar,
  Chip
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
  Inbox as InboxIcon,
  Assignment as TaskIcon,
  People as PeopleIcon,
  Apps as AppsIcon,
  Assessment as ReportIcon,
  Settings as SettingsIcon,
  CloudUpload as UploadIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
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
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

// Styled Components
const EmptyStateCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`
    : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[900]} 100%)`,
  border: `1px solid ${theme.palette.mode === 'light'
    ? theme.palette.grey[200]
    : theme.palette.grey[800]}`,
  boxShadow: theme.palette.mode === 'light'
    ? '0 8px 32px rgba(0, 0, 0, 0.1)'
    : '0 8px 32px rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(10px)',
  animation: `${fadeInUp} 0.6s ease-out`,
  overflow: 'visible',
}));

const IconWrapper = styled(Box)(({ theme, color = 'primary' }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${theme.palette[color].main}20, ${theme.palette[color].light}15)`,
  color: theme.palette[color].main,
  animation: `${float} 3s ease-in-out infinite`,
  marginBottom: theme.spacing(2),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${theme.palette[color].main}30, transparent)`,
    zIndex: -1,
    animation: `${pulse} 2s ease-in-out infinite`,
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  boxShadow: `0 4px 12px ${theme.palette.primary.main}20`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 24px ${theme.palette.primary.main}40`,
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  padding: theme.spacing(1, 2),
  fontWeight: 500,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-1px)',
  },
}));

// Empty State Component
export const EmptyState = ({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  variant = 'default',
  size = 'medium',
  showTips = false,
  tips = []
}) => {
  const getVariantConfig = (variant) => {
    const configs = {
      search: {
        icon: <SearchIcon sx={{ fontSize: 40 }} />,
        color: 'info',
        defaultTitle: 'No results found',
        defaultDescription: 'Try adjusting your search criteria or filters to find what you\'re looking for.'
      },
      inbox: {
        icon: <InboxIcon sx={{ fontSize: 40 }} />,
        color: 'grey',
        defaultTitle: 'Nothing here yet',
        defaultDescription: 'This space is waiting for content. Check back later or add something new.'
      },
      tasks: {
        icon: <TaskIcon sx={{ fontSize: 40 }} />,
        color: 'warning',
        defaultTitle: 'No tasks available',
        defaultDescription: 'All caught up! Create a new task to get started.'
      },
      users: {
        icon: <PeopleIcon sx={{ fontSize: 40 }} />,
        color: 'primary',
        defaultTitle: 'No users found',
        defaultDescription: 'Start by adding team members or inviting collaborators to your workspace.'
      },
      apps: {
        icon: <AppsIcon sx={{ fontSize: 40 }} />,
        color: 'success',
        defaultTitle: 'No applications yet',
        defaultDescription: 'Add your first application to start managing your digital assets.'
      },
      reports: {
        icon: <ReportIcon sx={{ fontSize: 40 }} />,
        color: 'info',
        defaultTitle: 'No data to display',
        defaultDescription: 'Reports and analytics will appear here once you have activity in your account.'
      },
      upload: {
        icon: <UploadIcon sx={{ fontSize: 40 }} />,
        color: 'primary',
        defaultTitle: 'Ready to upload',
        defaultDescription: 'Drag and drop files here or click to browse your computer.'
      },
      default: {
        icon: <InboxIcon sx={{ fontSize: 40 }} />,
        color: 'grey',
        defaultTitle: 'Nothing to show',
        defaultDescription: 'This area is empty. Add content or check back later.'
      }
    };
    return configs[variant] || configs.default;
  };

  const config = getVariantConfig(variant);
  const displayIcon = icon || config.icon;
  const displayTitle = title || config.defaultTitle;
  const displayDescription = description || config.defaultDescription;

  const getSizeStyles = (size) => {
    const sizes = {
      small: {
        cardPadding: 3,
        iconSize: 60,
        titleVariant: 'h6',
        descriptionVariant: 'body2'
      },
      medium: {
        cardPadding: 4,
        iconSize: 80,
        titleVariant: 'h5',
        descriptionVariant: 'body1'
      },
      large: {
        cardPadding: 6,
        iconSize: 100,
        titleVariant: 'h4',
        descriptionVariant: 'h6'
      }
    };
    return sizes[size] || sizes.medium;
  };

  const sizeStyles = getSizeStyles(size);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
      <EmptyStateCard elevation={0}>
        <CardContent sx={{ p: sizeStyles.cardPadding, textAlign: 'center' }}>
          <IconWrapper
            color={config.color}
            sx={{
              width: sizeStyles.iconSize,
              height: sizeStyles.iconSize,
              '& svg': { fontSize: sizeStyles.iconSize * 0.5 }
            }}
          >
            {displayIcon}
          </IconWrapper>

          <Typography
            variant={sizeStyles.titleVariant}
            gutterBottom
            fontWeight={600}
            sx={{ mb: 2 }}
          >
            {displayTitle}
          </Typography>

          <Typography
            variant={sizeStyles.descriptionVariant}
            color="text.secondary"
            sx={{ mb: 3, maxWidth: 400, mx: 'auto', lineHeight: 1.6 }}
          >
            {displayDescription}
          </Typography>

          {(primaryAction || secondaryAction) && (
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
              sx={{ mb: showTips && tips.length > 0 ? 3 : 0 }}
            >
              {primaryAction && (
                <ActionButton
                  variant="contained"
                  startIcon={primaryAction.icon}
                  onClick={primaryAction.onClick}
                  size={size === 'small' ? 'small' : 'medium'}
                >
                  {primaryAction.label}
                </ActionButton>
              )}

              {secondaryAction && (
                <SecondaryButton
                  variant="outlined"
                  startIcon={secondaryAction.icon}
                  onClick={secondaryAction.onClick}
                  size={size === 'small' ? 'small' : 'medium'}
                >
                  {secondaryAction.label}
                </SecondaryButton>
              )}
            </Stack>
          )}

          {showTips && tips.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                💡 Tips to get started:
              </Typography>
              <Stack spacing={1}>
                {tips.map((tip, index) => (
                  <Chip
                    key={index}
                    label={tip}
                    variant="outlined"
                    size="small"
                    sx={{
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText'
                      }
                    }}
                  />
                ))}
              </Stack>
            </Box>
          )}
        </CardContent>
      </EmptyStateCard>
    </Box>
  );
};

// Specific Empty State Components
export const NoSearchResults = ({ onClearFilters, searchQuery }) => (
  <EmptyState
    variant="search"
    title="No results found"
    description={`No items match "${searchQuery}". Try adjusting your search or filters.`}
    primaryAction={{
      label: "Clear Filters",
      icon: <FilterIcon />,
      onClick: onClearFilters
    }}
    showTips
    tips={[
      "Check your spelling",
      "Try using broader keywords",
      "Remove some filters to see more results"
    ]}
  />
);

export const NoData = ({ onCreate, createLabel = "Create First Item", type = "items" }) => (
  <EmptyState
    variant="inbox"
    title={`No ${type} yet`}
    description={`Get started by creating your first ${type.toLowerCase()}.`}
    primaryAction={onCreate ? {
      label: createLabel,
      icon: <AddIcon />,
      onClick: onCreate
    } : undefined}
  />
);

export const NoUsers = ({ onInvite }) => (
  <EmptyState
    variant="users"
    primaryAction={{
      label: "Invite Users",
      icon: <AddIcon />,
      onClick: onInvite
    }}
    showTips
    tips={[
      "Invite team members by email",
      "Set up user roles and permissions",
      "Create user groups for better organization"
    ]}
  />
);

export const NoApps = ({ onCreate }) => (
  <EmptyState
    variant="apps"
    primaryAction={{
      label: "Add Application",
      icon: <AddIcon />,
      onClick: onCreate
    }}
    showTips
    tips={[
      "Configure app settings and permissions",
      "Set up monitoring and alerts",
      "Define user access policies"
    ]}
  />
);

export default EmptyState;
