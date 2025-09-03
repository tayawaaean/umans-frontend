import { alpha } from '@mui/material/styles';
import { gray, orange, red, green } from '../themePrimitives';
import { blue } from "@mui/material/colors";

/* eslint-disable import/prefer-default-export */
export const feedbackCustomizations = {
  MuiAlert: {
    styleOverrides: {
      root: ({ ownerState, theme }) => {
        const severityColors = {
          error: {
            backgroundColor: red[100],
            border: `1px solid ${alpha(red[300], 0.5)}`,
            iconColor: red[700],
          },
          warning: {
            backgroundColor: orange[100],
            border: `1px solid ${alpha(orange[300], 0.5)}`,
            iconColor: orange[700],
          },
          info: {
            backgroundColor: blue[100],
            border: `1px solid ${alpha(blue[300], 0.5)}`,
            iconColor: blue[700],
          },
          success: {
            backgroundColor: green[100],
            border: `1px solid ${alpha(green[300], 0.5)}`,
            iconColor: green[700],
          },
        };

        const selectedColors = severityColors[ownerState.severity] || severityColors.info;

        return {
          borderRadius: 10,
          backgroundColor: selectedColors.backgroundColor,
          color: (theme.vars || theme).palette.text.primary,
          border: selectedColors.border,
          "& .MuiAlert-icon": {
            color: selectedColors.iconColor,
          },
          ...theme.applyStyles("dark", {
            backgroundColor: `${alpha(selectedColors.backgroundColor, 0.5)}`,
            border: `1px solid ${alpha(selectedColors.iconColor, 0.5)}`,
          }),
        };
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiDialog-paper': {
          borderRadius: 20,
          border: `1px solid ${theme.palette.mode === 'light' ? gray[200] : gray[700]}`,
          background: theme.palette.mode === 'light'
            ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${gray[50]} 100%)`
            : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${gray[900]} 100%)`,
          boxShadow: theme.palette.mode === 'light'
            ? '0 24px 64px rgba(0, 0, 0, 0.2), 0 8px 32px rgba(0, 0, 0, 0.1)'
            : '0 24px 64px rgba(0, 0, 0, 0.4), 0 8px 32px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(20px)',
          maxWidth: '600px',
          margin: theme.spacing(2),
        },
      }),
    },
  },

  MuiDialogTitle: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(3, 3, 2, 3),
        fontSize: '1.5rem',
        fontWeight: 600,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.mode === 'light' ? gray[200] : gray[700]}`,
        marginBottom: theme.spacing(2),
      }),
    },
  },

  MuiDialogContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(0, 3, 2, 3),
        color: theme.palette.text.secondary,
        lineHeight: 1.6,
      }),
    },
  },

  MuiDialogActions: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(2, 3, 3, 3),
        borderTop: `1px solid ${theme.palette.mode === 'light' ? gray[200] : gray[700]}`,
        gap: theme.spacing(1),
        '& .MuiButton-root': {
          borderRadius: 12,
          fontWeight: 500,
          textTransform: 'none',
          minWidth: 100,
        },
      }),
    },
  },

  MuiBackdrop: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.common.black, 0.6),
        backdropFilter: 'blur(8px)',
      }),
    },
  },

  MuiDrawer: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiDrawer-paper': {
          borderRadius: theme.spacing(0, 3, 3, 0),
          border: `1px solid ${theme.palette.mode === 'light' ? gray[200] : gray[700]}`,
          background: theme.palette.mode === 'light'
            ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${gray[50]} 100%)`
            : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${gray[900]} 100%)`,
          boxShadow: theme.palette.mode === 'light'
            ? '-8px 0 32px rgba(0, 0, 0, 0.1)'
            : '-8px 0 32px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(20px)',
        },
      }),
    },
  },

  MuiPopover: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiPopover-paper': {
          borderRadius: 16,
          border: `1px solid ${theme.palette.mode === 'light' ? gray[200] : gray[700]}`,
          background: theme.palette.mode === 'light'
            ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${gray[50]} 100%)`
            : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${gray[900]} 100%)`,
          boxShadow: theme.palette.mode === 'light'
            ? '0 16px 48px rgba(0, 0, 0, 0.15)'
            : '0 16px 48px rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(20px)',
        },
      }),
    },
  },

  MuiMenu: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiPaper-root': {
          borderRadius: 16,
          border: `1px solid ${theme.palette.mode === 'light' ? gray[200] : gray[700]}`,
          background: theme.palette.mode === 'light'
            ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${gray[50]} 100%)`
            : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${gray[900]} 100%)`,
          boxShadow: theme.palette.mode === 'light'
            ? '0 16px 48px rgba(0, 0, 0, 0.15)'
            : '0 16px 48px rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(20px)',
          marginTop: theme.spacing(1),
        },
      }),
    },
  },

  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 12,
        margin: theme.spacing(0.5, 1),
        padding: theme.spacing(1.5, 2),
        fontSize: '0.875rem',
        fontWeight: 500,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          transform: 'translateX(4px)',
          '& .MuiSvgIcon-root': {
            color: theme.palette.primary.main,
          },
        },
        '& .MuiSvgIcon-root': {
          marginRight: theme.spacing(1.5),
          color: theme.palette.text.secondary,
          transition: 'color 0.2s ease-in-out',
        },
      }),
    },
  },

  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }) => ({
        backgroundColor: theme.palette.mode === 'light'
          ? alpha(gray[900], 0.9)
          : alpha(gray[100], 0.9),
        color: theme.palette.mode === 'light'
          ? gray[100]
          : gray[900],
        fontSize: '0.75rem',
        fontWeight: 500,
        borderRadius: 8,
        padding: theme.spacing(1, 1.5),
        boxShadow: theme.palette.mode === 'light'
          ? '0 4px 16px rgba(0, 0, 0, 0.1)'
          : '0 4px 16px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
      }),
      arrow: ({ theme }) => ({
        color: theme.palette.mode === 'light'
          ? alpha(gray[900], 0.9)
          : alpha(gray[100], 0.9),
      }),
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: ({ theme }) => ({
        height: 8,
        borderRadius: 8,
        backgroundColor: gray[200],
        ...theme.applyStyles('dark', {
          backgroundColor: gray[800],
        }),
      }),
    },
  },
};
