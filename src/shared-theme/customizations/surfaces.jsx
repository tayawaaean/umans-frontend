import { alpha } from '@mui/material/styles';
import { gray } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const surfacesCustomizations = {
  MuiAccordion: {
    defaultProps: {
      elevation: 0,
      disableGutters: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        padding: 0,
        overflow: 'clip',
        background: theme.palette.mode === 'light'
          ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${gray[50]} 100%)`
          : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${gray[900]} 100%)`,
        border: `1px solid ${theme.palette.mode === 'light' ? gray[200] : gray[700]}`,
        borderRadius: 12,
        boxShadow: theme.palette.mode === 'light'
          ? '0 2px 8px rgba(0, 0, 0, 0.04)'
          : '0 2px 8px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ':before': {
          backgroundColor: 'transparent',
        },
        '&:not(:last-of-type)': {
          borderBottom: 'none',
        },
        '&:first-of-type': {
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        },
        '&:last-of-type': {
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
        },
        '&:hover': {
          boxShadow: theme.palette.mode === 'light'
            ? '0 4px 16px rgba(0, 0, 0, 0.08)'
            : '0 4px 16px rgba(0, 0, 0, 0.3)',
          transform: 'translateY(-1px)',
        },
        '&.Mui-expanded': {
          boxShadow: theme.palette.mode === 'light'
            ? '0 8px 24px rgba(0, 0, 0, 0.12)'
            : '0 8px 24px rgba(0, 0, 0, 0.4)',
          '& .MuiAccordionSummary-root': {
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
          },
        },
      }),
    },
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: ({ theme }) => ({
        border: 'none',
        borderRadius: 12,
        padding: theme.spacing(2, 3),
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
          '& .MuiAccordionSummary-expandIconWrapper': {
            color: theme.palette.primary.main,
            transform: 'scale(1.1)',
          },
        },
        '&:focus-visible': {
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: '2px',
        },
        '& .MuiAccordionSummary-expandIconWrapper': {
          color: theme.palette.text.secondary,
          transition: 'all 0.3s ease',
          transform: 'rotate(0deg)',
        },
        '&.Mui-expanded .MuiAccordionSummary-expandIconWrapper': {
          transform: 'rotate(180deg)',
          color: theme.palette.primary.main,
        },
        ...theme.applyStyles('dark', {
          '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.1) },
        }),
      }),
    },
  },
  MuiAccordionDetails: {
    styleOverrides: {
      root: { mb: 20, border: 'none' },
    },
  },
  MuiPaper: {
    defaultProps: {
      elevation: 0,
    },
  },
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => {
        return {
          padding: 24,
          gap: 16,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          background: theme.palette.mode === 'light'
            ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${gray[50]} 100%)`
            : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${gray[900]} 100%)`,
          borderRadius: 16,
          border: `1px solid ${theme.palette.mode === 'light' ? gray[200] : gray[700]}`,
          boxShadow: theme.palette.mode === 'light'
            ? '0 4px 20px rgba(0, 0, 0, 0.08)'
            : '0 4px 20px rgba(0, 0, 0, 0.25)',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.success.main})`,
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.palette.mode === 'light'
              ? '0 12px 40px rgba(0, 0, 0, 0.12)'
              : '0 12px 40px rgba(0, 0, 0, 0.35)',
            '&::before': {
              opacity: 1,
            },
          },
          '&:focus-visible': {
            outline: `3px solid ${theme.palette.primary.main}`,
            outlineOffset: '2px',
          },
          ...theme.applyStyles('dark', {
            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${gray[900]} 100%)`,
          }),
          variants: [
            {
              props: {
                variant: 'outlined',
              },
              style: {
                border: `2px solid ${theme.palette.mode === 'light' ? gray[200] : gray[700]}`,
                boxShadow: 'none',
                background: theme.palette.mode === 'light'
                  ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${gray[50]} 100%)`
                  : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${gray[900]} 100%)`,
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  transform: 'translateY(-2px)',
                },
                ...theme.applyStyles('dark', {
                  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${gray[900]} 100%)`,
                }),
              },
            },
            {
              props: {
                variant: 'elevation',
              },
              style: {
                boxShadow: theme.palette.mode === 'light'
                  ? '0 8px 32px rgba(0, 0, 0, 0.1)'
                  : '0 8px 32px rgba(0, 0, 0, 0.3)',
                '&:hover': {
                  boxShadow: theme.palette.mode === 'light'
                    ? '0 16px 48px rgba(0, 0, 0, 0.15)'
                    : '0 16px 48px rgba(0, 0, 0, 0.4)',
                },
              },
            },
          ],
        };
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: 0,
        '&:last-child': { paddingBottom: 0 },
      },
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },
  MuiCardActions: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(2, 0, 0, 0),
        gap: theme.spacing(1),
        '& .MuiButton-root': {
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
      }),
    },
  },

  // Additional surface components for micro-interactions
  MuiFab: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 16,
        boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'scale(1.1)',
          boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.4)}`,
        },
        '&:active': {
          transform: 'scale(0.95)',
        },
      }),
    },
  },

  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 8,
        fontWeight: 500,
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
        },
        '& .MuiChip-deleteIcon': {
          transition: 'all 0.2s ease',
          '&:hover': {
            color: theme.palette.error.main,
            transform: 'scale(1.2)',
          },
        },
      }),
    },
  },

  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        textTransform: 'none',
        fontWeight: 500,
        fontSize: '0.875rem',
        minHeight: 48,
        padding: theme.spacing(1.5, 3),
        borderRadius: 8,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '50%',
          width: 0,
          height: '2px',
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          transition: 'all 0.3s ease',
          transform: 'translateX(-50%)',
        },
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
          '&::before': {
            width: '60%',
          },
        },
        '&.Mui-selected': {
          color: theme.palette.primary.main,
          fontWeight: 600,
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          '&::before': {
            width: '100%',
          },
        },
      }),
    },
  },

  MuiStepper: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(3),
      }),
    },
  },

  MuiStep: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiStepLabel-root': {
          '& .MuiStepLabel-iconContainer': {
            '& .MuiStepIcon-root': {
              borderRadius: '50%',
              transition: 'all 0.3s ease',
              '&.Mui-active': {
                boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.2)}`,
                transform: 'scale(1.1)',
              },
              '&.Mui-completed': {
                background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.light})`,
              },
            },
          },
        },
      }),
    },
  },

  MuiSwitch: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiSwitch-switchBase': {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            '& + .MuiSwitch-track': {
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              opacity: 1,
            },
            '& .MuiSwitch-thumb': {
              backgroundColor: theme.palette.primary.contrastText,
              boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.3)}`,
            },
          },
          '&:hover': {
            '& .MuiSwitch-thumb': {
              boxShadow: `0 2px 12px ${alpha(theme.palette.primary.main, 0.4)}`,
            },
          },
        },
        '& .MuiSwitch-thumb': {
          boxShadow: `0 2px 4px ${alpha(theme.palette.text.secondary, 0.2)}`,
          transition: 'all 0.3s ease',
        },
        '& .MuiSwitch-track': {
          borderRadius: 16,
          backgroundColor: alpha(theme.palette.text.secondary, 0.2),
          opacity: 1,
          transition: 'all 0.3s ease',
        },
      }),
    },
  },
};
