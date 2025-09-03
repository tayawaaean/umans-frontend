import { alpha } from '@mui/material/styles';
import { gray, orange, red, green } from '../themePrimitives';
import { blue } from "@mui/material/colors";

/* eslint-disable import/prefer-default-export */
export const layoutCustomizations = {
  MuiContainer: {
    styleOverrides: {
      root: ({ theme }) => ({
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          paddingLeft: theme.spacing(3),
          paddingRight: theme.spacing(3),
        },
        [theme.breakpoints.up('md')]: {
          paddingLeft: theme.spacing(4),
          paddingRight: theme.spacing(4),
        },
        [theme.breakpoints.up('lg')]: {
          paddingLeft: theme.spacing(6),
          paddingRight: theme.spacing(6),
        },
      }),
    },
  },

  MuiGrid: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiGrid-item': {
          // Ensure touch targets are at least 44px on mobile
          [theme.breakpoints.down('sm')]: {
            minHeight: 44,
            '& button, & .MuiIconButton-root, & .MuiChip-root': {
              minHeight: 44,
              minWidth: 44,
            },
          },
        },
      }),
    },
  },

  MuiToolbar: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 64,
        [theme.breakpoints.up('sm')]: {
          minHeight: 72,
        },
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          paddingLeft: theme.spacing(3),
          paddingRight: theme.spacing(3),
        },
      }),
    },
  },

  MuiAppBar: {
    styleOverrides: {
      root: ({ theme }) => ({
        [theme.breakpoints.down('sm')]: {
          '& .MuiToolbar-root': {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
          },
        },
      }),
    },
  },

  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        [theme.breakpoints.up('sm')]: {
          width: 280,
        },
        [theme.breakpoints.down('sm')]: {
          width: '280px',
          maxWidth: '85vw',
        },
      }),
    },
  },

  MuiListItemButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        [theme.breakpoints.down('sm')]: {
          minHeight: 48,
          paddingTop: theme.spacing(1.5),
          paddingBottom: theme.spacing(1.5),
        },
      }),
    },
  },

  // Touch-friendly enhancements
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        [theme.breakpoints.down('sm')]: {
          minHeight: 44,
          padding: theme.spacing(1.5, 2),
          fontSize: '0.95rem',
        },
      }),
    },
  },

  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        [theme.breakpoints.down('sm')]: {
          padding: theme.spacing(1.5),
          '&.MuiIconButton-sizeSmall': {
            padding: theme.spacing(1),
          },
          '&.MuiIconButton-sizeMedium': {
            padding: theme.spacing(1.5),
          },
          '&.MuiIconButton-sizeLarge': {
            padding: theme.spacing(2),
          },
        },
      }),
    },
  },

  // Table responsiveness
  MuiTableContainer: {
    styleOverrides: {
      root: ({ theme }) => ({
        [theme.breakpoints.down('md')]: {
          '& .MuiTable-root': {
            fontSize: '0.875rem',
          },
          '& .MuiTableCell-root': {
            padding: theme.spacing(1, 0.5),
          },
        },
        [theme.breakpoints.down('sm')]: {
          // Horizontal scroll for very small screens
          overflowX: 'auto',
          '& .MuiTable-root': {
            minWidth: 600,
          },
        },
      }),
    },
  },

  // Card responsiveness
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        [theme.breakpoints.down('sm')]: {
          margin: theme.spacing(1),
          '& .MuiCardContent-root': {
            padding: theme.spacing(2),
          },
        },
      }),
    },
  },

  // Dialog responsiveness
  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => ({
        [theme.breakpoints.down('sm')]: {
          margin: theme.spacing(1),
          maxHeight: 'calc(100vh - 16px)',
          width: 'calc(100vw - 16px)',
          maxWidth: 'calc(100vw - 16px)',
        },
        [theme.breakpoints.up('sm')]: {
          margin: theme.spacing(2),
        },
      }),
    },
  },

  // Form responsiveness
  MuiTextField: {
    styleOverrides: {
      root: ({ theme }) => ({
        [theme.breakpoints.down('sm')]: {
          '& .MuiInputLabel-root': {
            fontSize: '0.875rem',
          },
          '& .MuiOutlinedInput-root': {
            fontSize: '1rem', // Prevent zoom on iOS
          },
        },
      }),
    },
  },

  // Navigation responsiveness
  MuiTabs: {
    styleOverrides: {
      root: ({ theme }) => ({
        [theme.breakpoints.down('sm')]: {
          '& .MuiTab-root': {
            minHeight: 48,
            fontSize: '0.875rem',
            padding: theme.spacing(1, 2),
          },
        },
        // Scrollable tabs on small screens
        [theme.breakpoints.down('md')]: {
          '& .MuiTabs-flexContainer': {
            overflowX: 'auto',
            '&::-webkit-scrollbar': {
              height: 4,
            },
            '&::-webkit-scrollbar-track': {
              background: alpha(theme.palette.divider, 0.1),
            },
            '&::-webkit-scrollbar-thumb': {
              background: alpha(theme.palette.divider, 0.3),
              borderRadius: 2,
            },
          },
        },
      }),
    },
  },

  // Menu responsiveness
  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }) => ({
        [theme.breakpoints.down('sm')]: {
          maxHeight: 'calc(100vh - 100px)',
          maxWidth: 'calc(100vw - 32px)',
        },
      }),
    },
  },

  // Chip responsiveness
  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        [theme.breakpoints.down('sm')]: {
          height: 32,
          fontSize: '0.8125rem',
          '& .MuiChip-deleteIcon': {
            fontSize: '1rem',
          },
        },
      }),
    },
  },
};
