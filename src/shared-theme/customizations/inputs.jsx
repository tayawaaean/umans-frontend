import { alpha } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
import { toggleButtonClasses } from '@mui/material/ToggleButton';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { gray, brand } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const inputsCustomizations = {
  MuiButtonBase: {
    defaultProps: {
      disableTouchRipple: true,
      disableRipple: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        boxSizing: 'border-box',
        transition: 'all 100ms ease-in',
        '&:focus-visible': {
          outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
          outlineOffset: '2px',
        },
      }),
    },
  },
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: 'none',
        borderRadius: 12,
        textTransform: 'none',
        fontWeight: 500,
        letterSpacing: '0.02em',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 0,
          height: 0,
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          transition: 'width 0.6s, height 0.6s',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
        },
        '&:active::before': {
          width: '300px',
          height: '300px',
        },
        '& .MuiButton-startIcon, & .MuiButton-endIcon': {
          transition: 'transform 0.3s ease',
        },
        '&:hover .MuiButton-startIcon, &:hover .MuiButton-endIcon': {
          transform: 'scale(1.1)',
        },
        variants: [
          {
            props: {
              size: 'small',
            },
            style: {
              height: '2.25rem',
              padding: '8px 16px',
              fontSize: '0.875rem',
            },
          },
          {
            props: {
              size: 'medium',
            },
            style: {
              height: '2.5rem',
              padding: '12px 24px',
              fontSize: '0.95rem',
            },
          },
          {
            props: {
              size: 'large',
            },
            style: {
              height: '3rem',
              padding: '16px 32px',
              fontSize: '1rem',
            },
          },
          {
            props: {
              color: 'primary',
              variant: 'contained',
            },
            style: {
              color: 'white',
              background: `linear-gradient(135deg, ${brand[500]}, ${brand[600]})`,
              boxShadow: `0 4px 16px ${brand[500]}40`,
              border: `1px solid ${brand[400]}`,
              '&:hover': {
                background: `linear-gradient(135deg, ${brand[600]}, ${brand[700]})`,
                boxShadow: `0 8px 24px ${brand[500]}60`,
                transform: 'translateY(-2px)',
              },
              '&:active': {
                background: `linear-gradient(135deg, ${brand[700]}, ${brand[800]})`,
                transform: 'translateY(-1px)',
                boxShadow: `0 2px 8px ${brand[500]}40`,
              },
              '&:focus-visible': {
                outline: `3px solid ${brand[300]}`,
                outlineOffset: '2px',
              },
              ...theme.applyStyles('dark', {
                color: 'white',
                background: `linear-gradient(135deg, ${brand[600]}, ${brand[700]})`,
                boxShadow: `0 4px 16px ${brand[700]}40`,
                border: `1px solid ${brand[500]}`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${brand[700]}, ${brand[800]})`,
                  boxShadow: `0 8px 24px ${brand[700]}60`,
                },
                '&:active': {
                  background: `linear-gradient(135deg, ${brand[800]}, ${brand[900]})`,
                },
              }),
            },
          },
          {
            props: {
              color: 'secondary',
              variant: 'contained',
            },
            style: {
              color: 'white',
              backgroundColor: brand[300],
              backgroundImage: `linear-gradient(to bottom, ${alpha(brand[400], 0.8)}, ${brand[500]})`,
              boxShadow: `inset 0 2px 0 ${alpha(brand[200], 0.2)}, inset 0 -2px 0 ${alpha(brand[700], 0.4)}`,
              border: `1px solid ${brand[500]}`,
              '&:hover': {
                backgroundColor: brand[700],
                boxShadow: 'none',
              },
              '&:active': {
                backgroundColor: brand[700],

              },
            },
          },
          {
            props: {
              variant: 'outlined',
            },
            style: {
              color: (theme.vars || theme).palette.text.primary,
              border: `2px solid ${gray[300]}`,
              backgroundColor: 'transparent',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                backgroundColor: alpha(gray[100], 0.8),
                borderColor: gray[400],
                transform: 'translateY(-1px)',
                boxShadow: `0 4px 12px ${alpha(gray[400], 0.3)}`,
              },
              '&:active': {
                backgroundColor: alpha(gray[200], 0.9),
                transform: 'translateY(0px)',
                boxShadow: `0 2px 6px ${alpha(gray[400], 0.2)}`,
              },
              '&:focus-visible': {
                outline: `3px solid ${brand[300]}`,
                outlineOffset: '2px',
              },
              ...theme.applyStyles('dark', {
                borderColor: gray[600],
                '&:hover': {
                  backgroundColor: alpha(gray[800], 0.8),
                  borderColor: gray[500],
                },
                '&:active': {
                  backgroundColor: alpha(gray[700], 0.9),
                },
              }),
            },
          },
          {
            props: {
              color: 'secondary',
              variant: 'outlined',
            },
            style: {
              color: brand[700],
              border: '1px solid',
              borderColor: brand[200],
              backgroundColor: brand[50],
              '&:hover': {
                backgroundColor: brand[100],
                borderColor: brand[400],
              },
              '&:active': {
                backgroundColor: alpha(brand[200], 0.7),
              },
              ...theme.applyStyles('dark', {
                color: brand[50],
                border: '1px solid',
                borderColor: brand[900],
                backgroundColor: alpha(brand[900], 0.3),
                '&:hover': {
                  borderColor: brand[700],
                  backgroundColor: alpha(brand[900], 0.6),
                },
                '&:active': {
                  backgroundColor: alpha(brand[900], 0.5),
                },
              }),
            },
          },
          {
            props: {
              variant: 'text',
            },
            style: {
              color: gray[600],
              '&:hover': {
                backgroundColor: gray[100],
              },
              '&:active': {
                backgroundColor: gray[200],
              },
              ...theme.applyStyles('dark', {
                color: gray[50],
                '&:hover': {
                  backgroundColor: gray[700],
                },
                '&:active': {
                  backgroundColor: alpha(gray[700], 0.7),
                },
              }),
            },
          },
          {
            props: {
              color: 'secondary',
              variant: 'text',
            },
            style: {
              color: brand[700],
              '&:hover': {
                backgroundColor: alpha(brand[100], 0.5),
              },
              '&:active': {
                backgroundColor: alpha(brand[200], 0.7),
              },
              ...theme.applyStyles('dark', {
                color: brand[100],
                '&:hover': {
                  backgroundColor: alpha(brand[900], 0.5),
                },
                '&:active': {
                  backgroundColor: alpha(brand[900], 0.3),
                },
              }),
            },
          },
        ],
      }),
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: 'none',
        borderRadius: 12,
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightMedium,
        letterSpacing: 0,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 0,
          height: 0,
          borderRadius: '50%',
          backgroundColor: alpha(gray[400], 0.2),
          transition: 'width 0.4s, height 0.4s',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
        },
        '&:hover': {
          backgroundColor: alpha(gray[100], 0.8),
          transform: 'scale(1.05)',
          boxShadow: `0 4px 12px ${alpha(gray[400], 0.3)}`,
          '&::before': {
            width: '100%',
            height: '100%',
          },
        },
        '&:active': {
          transform: 'scale(0.95)',
          '&::before': {
            width: '120%',
            height: '120%',
          },
        },
        '&:focus-visible': {
          outline: `3px solid ${brand[300]}`,
          outlineOffset: '2px',
        },
        ...theme.applyStyles('dark', {
          '&:hover': {
            backgroundColor: alpha(gray[800], 0.8),
          },
        }),
        variants: [
          {
            props: {
              size: 'small',
            },
            style: {
              width: '2.25rem',
              height: '2.25rem',
              padding: '0.375rem',
              [`& .${svgIconClasses.root}`]: { fontSize: '1rem' },
            },
          },
          {
            props: {
              size: 'medium',
            },
            style: {
              width: '2.5rem',
              height: '2.5rem',
              padding: '0.5rem',
            },
          },
          {
            props: {
              size: 'large',
            },
            style: {
              width: '3rem',
              height: '3rem',
              padding: '0.75rem',
              [`& .${svgIconClasses.root}`]: { fontSize: '1.5rem' },
            },
          },
        ],
      }),
    },
  },
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: '10px',
        boxShadow: `0 4px 16px ${alpha(gray[400], 0.2)}`,
        [`& .${toggleButtonGroupClasses.selected}`]: {
          color: brand[500],
        },
        ...theme.applyStyles('dark', {
          [`& .${toggleButtonGroupClasses.selected}`]: {
            color: '#fff',
          },
          boxShadow: `0 4px 16px ${alpha(brand[700], 0.5)}`,
        }),
      }),
    },
  },
  MuiToggleButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: '12px 16px',
        textTransform: 'none',
        borderRadius: '10px',
        fontWeight: 500,
        ...theme.applyStyles('dark', {
          color: gray[400],
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
          [`&.${toggleButtonClasses.selected}`]: {
            color: brand[300],
          },
        }),
      }),
    },
  },
  MuiCheckbox: {
    defaultProps: {
      disableRipple: true,
      icon: (
        <CheckBoxOutlineBlankRoundedIcon sx={{ color: 'hsla(210, 0%, 0%, 0.0)' }} />
      ),
      checkedIcon: <CheckRoundedIcon sx={{ height: 14, width: 14 }} />,
      indeterminateIcon: <RemoveRoundedIcon sx={{ height: 14, width: 14 }} />,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        margin: 10,
        height: 16,
        width: 16,
        borderRadius: 5,
        border: '1px solid ',
        borderColor: alpha(gray[300], 0.8),
        boxShadow: '0 0 0 1.5px hsla(210, 0%, 0%, 0.04) inset',
        backgroundColor: alpha(gray[100], 0.4),
        transition: 'border-color, background-color, 120ms ease-in',
        '&:hover': {
          borderColor: brand[300],
        },
        '&.Mui-focusVisible': {
          outline: `3px solid ${alpha(brand[500], 0.5)}`,
          outlineOffset: '2px',
          borderColor: brand[400],
        },
        '&.Mui-checked': {
          color: 'white',
          backgroundColor: brand[500],
          borderColor: brand[500],
          boxShadow: `none`,
          '&:hover': {
            backgroundColor: brand[600],
          },
        },
        ...theme.applyStyles('dark', {
          borderColor: alpha(gray[700], 0.8),
          boxShadow: '0 0 0 1.5px hsl(210, 0%, 0%) inset',
          backgroundColor: alpha(gray[900], 0.8),
          '&:hover': {
            borderColor: brand[300],
          },
          '&.Mui-focusVisible': {
            borderColor: brand[400],
            outline: `3px solid ${alpha(brand[500], 0.5)}`,
            outlineOffset: '2px',
          },
        }),
      }),
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        border: 'none',
      },
      input: {
        '&::placeholder': {
          opacity: 0.7,
          color: gray[500],
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        padding: '12px 16px',
        fontSize: '0.95rem',
        fontWeight: 400,
        lineHeight: 1.5,
        '&::placeholder': {
          color: gray[500],
          opacity: 0.8,
          fontStyle: 'italic',
        },
      },
      root: ({ theme }) => ({
        borderRadius: 12,
        backgroundColor: theme.palette.mode === 'light'
          ? alpha(gray[50], 0.6)
          : alpha(gray[900], 0.6),
        backdropFilter: 'blur(10px)',
        border: `1px solid ${theme.palette.mode === 'light' ? gray[300] : gray[600]}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          backgroundColor: theme.palette.mode === 'light'
            ? alpha(gray[100], 0.8)
            : alpha(gray[800], 0.8),
          borderColor: theme.palette.mode === 'light' ? gray[400] : gray[500],
          transform: 'translateY(-1px)',
          boxShadow: `0 4px 12px ${alpha(gray[400], 0.2)}`,
        },
        [`&.${outlinedInputClasses.focused}`]: {
          backgroundColor: theme.palette.background.paper,
          borderColor: brand[400],
          boxShadow: `0 0 0 3px ${alpha(brand[400], 0.1)}, 0 4px 16px ${alpha(brand[400], 0.2)}`,
          transform: 'translateY(-2px)',
        },
        '&.Mui-error': {
          borderColor: theme.palette.error.main,
          '&:hover': {
            borderColor: theme.palette.error.main,
          },
          [`&.${outlinedInputClasses.focused}`]: {
            borderColor: theme.palette.error.main,
            boxShadow: `0 0 0 3px ${alpha(theme.palette.error.main, 0.1)}`,
          },
        },
        ...theme.applyStyles('dark', {
          backgroundColor: alpha(gray[900], 0.6),
          '&:hover': {
            backgroundColor: alpha(gray[800], 0.8),
          },
          [`&.${outlinedInputClasses.focused}`]: {
            backgroundColor: theme.palette.background.paper,
          },
        }),
        variants: [
          {
            props: {
              size: 'small',
            },
            style: {
              height: '2.5rem',
              '& .MuiOutlinedInput-input': {
                padding: '8px 12px',
                fontSize: '0.875rem',
              },
            },
          },
          {
            props: {
              size: 'medium',
            },
            style: {
              height: '3rem',
            },
          },
          {
            props: {
              size: 'large',
            },
            style: {
              height: '3.5rem',
              '& .MuiOutlinedInput-input': {
                padding: '16px 20px',
                fontSize: '1rem',
              },
            },
          },
        ],
      }),
      notchedOutline: {
        border: 'none',
        '& legend': {
          fontSize: '0.75rem',
          fontWeight: 500,
          lineHeight: '1rem',
          marginLeft: 8,
        },
      },
    },
  },
  MuiInputAdornment: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: (theme.vars || theme).palette.grey[500],
        ...theme.applyStyles('dark', {
          color: (theme.vars || theme).palette.grey[400],
        }),
      }),
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        typography: theme.typography.caption,
        //marginBottom: 8,
      }),
    },
  },
  //text field global customizations
  MuiTextField: {
    defaultProps: {
      size: 'small',
      margin: 'dense',
      variant: 'outlined',
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        // default position tweaks
        padding: '0 0px',
        //fontSize: '1rem',
        transform: 'translate(14px, 13px) scale(1)', //position of label and size
        transition: theme.transitions.create(['color', 'transform'], {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeOut,
        }),

        // for focused/shrunk state (when the label floats)
        '&.MuiInputLabel-shrink': {
          transform: 'translate(17px, -5px) scale(0.85)', //position after shingking and scale of shrink
          //padding: '0 7px'
        },
      }),
    },
  },
};
