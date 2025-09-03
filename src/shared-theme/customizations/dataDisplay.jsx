import { alpha } from '@mui/material/styles';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { typographyClasses } from '@mui/material/Typography';
import { buttonBaseClasses } from '@mui/material/ButtonBase';
import { chipClasses } from '@mui/material/Chip';
import { iconButtonClasses } from '@mui/material/IconButton';
import { gray, red, green, brand } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const dataDisplayCustomizations = {
  MuiList: {
    styleOverrides: {
      root: {
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        [`& .${svgIconClasses.root}`]: {
          width: '1rem',
          height: '1rem',
          color: (theme.vars || theme).palette.text.secondary,
        },
        [`& .${typographyClasses.root}`]: {
          fontWeight: 500,
          
        },
        [`& .${buttonBaseClasses.root}`]: {
          display: 'flex',
          gap: 8,
          padding: '2px 8px',
          borderRadius: (theme.vars || theme).shape.borderRadius,
          opacity: 0.7,
          '&.Mui-selected': {
            opacity: 1,
            backgroundColor: alpha(theme.palette.action.selected, 0.3),
            [`& .${svgIconClasses.root}`]: {
              color: (theme.vars || theme).palette.text.primary,
            },
            '&:focus-visible': {
              backgroundColor: alpha(theme.palette.action.selected, 0.3),
            },
            '&:hover': {
              backgroundColor: alpha(theme.palette.action.selected, .5),
            },
          },
          '&:focus-visible': {
            backgroundColor: 'transparent',
          },
        },
      }),
    },
  },
  MuiListItemText: {
    styleOverrides: {
      primary: ({ theme }) => ({
        fontSize: theme.typography.body2.fontSize,
        fontWeight: 500,
        lineHeight: theme.typography.body2.lineHeight,
      }),
      secondary: ({ theme }) => ({
        fontSize: theme.typography.caption.fontSize,
        lineHeight: theme.typography.caption.lineHeight,
      }),
    },
  },
  MuiListSubheader: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: 'transparent',
        padding: '4px 8px',
        fontSize: theme.typography.caption.fontSize,
        fontWeight: 500,
        lineHeight: theme.typography.caption.lineHeight,
      }),
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: 0,
      },
    },
  },
  MuiChip: {
    defaultProps: {
      size: 'small',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        border: '1px solid',
        borderRadius: '999px',
        [`& .${chipClasses.label}`]: {
          fontWeight: 600,
        },
        variants: [
          {
            props: {
              color: 'default',
            },
            style: {
              borderColor: gray[200],
              backgroundColor: gray[100],
              [`& .${chipClasses.label}`]: {
                color: gray[500],
              },
              [`& .${chipClasses.icon}`]: {
                color: gray[500],
              },
              ...theme.applyStyles('dark', {
                borderColor: gray[700],
                backgroundColor: gray[800],
                [`& .${chipClasses.label}`]: {
                  color: gray[300],
                },
                [`& .${chipClasses.icon}`]: {
                  color: gray[300],
                },
              }),
            },
          },
          {
            props: {
              color: 'success',
            },
            style: {
              borderColor: green[200],
              backgroundColor: green[50],
              [`& .${chipClasses.label}`]: {
                color: green[500],
              },
              [`& .${chipClasses.icon}`]: {
                color: green[500],
              },
              ...theme.applyStyles('dark', {
                borderColor: green[800],
                backgroundColor: green[900],
                [`& .${chipClasses.label}`]: {
                  color: green[300],
                },
                [`& .${chipClasses.icon}`]: {
                  color: green[300],
                },
              }),
            },
          },
          {
            props: {
              color: 'error',
            },
            style: {
              borderColor: red[100],
              backgroundColor: red[50],
              [`& .${chipClasses.label}`]: {
                color: red[500],
              },
              [`& .${chipClasses.icon}`]: {
                color: red[500],
              },
              ...theme.applyStyles('dark', {
                borderColor: red[800],
                backgroundColor: red[900],
                [`& .${chipClasses.label}`]: {
                  color: red[200],
                },
                [`& .${chipClasses.icon}`]: {
                  color: red[300],
                },
              }),
            },
          },
          {
            props: { size: 'small' },
            style: {
              maxHeight: 20,
              [`& .${chipClasses.label}`]: {
                fontSize: theme.typography.caption.fontSize,
              },
              [`& .${svgIconClasses.root}`]: {
                fontSize: theme.typography.caption.fontSize,
              },
            },
          },
          {
            props: { size: 'medium' },
            style: {
              [`& .${chipClasses.label}`]: {
                fontSize: theme.typography.caption.fontSize,
              },
            },
          },
        ],
      }),
    },
  },
  MuiTablePagination: {
    styleOverrides: {
      root: {
        paddingLeft: 16,
        paddingRight: 16,
        marginTop: 8,
      },
      actions: {
        display: 'flex',
        gap: 8,
        marginRight: 6,
        [`& .${iconButtonClasses.root}`]: {
          minWidth: 0,
          width: 36,
          height: 36,
        },
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: ({theme}) => ({
        fontWeight: 400,
        fontSize: '0.875rem',
        lineHeight: 1.43,
        padding: '12px 16px',
        borderBottom: `1px solid ${theme.palette.mode === 'light' ? gray[200] : gray[700]}`,
        transition: 'all 0.2s ease-in-out',
        position: 'relative',
        '&:hover': {
          backgroundColor: alpha(theme.palette.action.hover, 0.5),
        },
      }),
      head: ({ theme }) => ({
        background: theme.palette.mode === 'light'
          ? `linear-gradient(135deg, ${gray[50]} 0%, ${gray[100]} 100%)`
          : `linear-gradient(135deg, ${gray[800]} 0%, ${gray[900]} 100%)`,
        fontSize: '0.875rem',
        fontWeight: 600,
        padding: '16px 16px',
        color: theme.palette.text.primary,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        borderBottom: `2px solid ${theme.palette.mode === 'light' ? gray[300] : gray[600]}`,
        position: 'sticky',
        top: 0,
        zIndex: 10,
        '&:hover': {
          background: theme.palette.mode === 'light'
            ? `linear-gradient(135deg, ${gray[100]} 0%, ${gray[200]} 100%)`
            : `linear-gradient(135deg, ${gray[700]} 0%, ${gray[800]} 100%)`,
        },
      }),
      body: ({ theme }) => ({
        color: theme.palette.text.primary,
        '&:hover': {
          backgroundColor: alpha(theme.palette.action.hover, 0.3),
          transform: 'translateY(-1px)',
          boxShadow: `0 2px 8px ${alpha(theme.palette.action.hover, 0.2)}`,
        },
      }),
      stickyHeader: ({ theme }) => ({
        background: theme.palette.mode === 'light'
          ? `linear-gradient(135deg, ${gray[50]} 0%, ${gray[100]} 100%)`
          : `linear-gradient(135deg, ${gray[800]} 0%, ${gray[900]} 100%)`,
      }),
    },
    defaultProps: {
      align: 'left',
    },
  },

  MuiTableRow: {
    styleOverrides: {
      root: ({ theme }) => ({
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: alpha(theme.palette.action.hover, 0.4),
          transform: 'translateY(-1px)',
          boxShadow: `0 4px 12px ${alpha(theme.palette.action.hover, 0.3)}`,
          '& .MuiTableCell-root': {
            backgroundColor: 'transparent',
          },
        },
        '&.Mui-selected': {
          backgroundColor: alpha(brand[50], 0.3),
          '&:hover': {
            backgroundColor: alpha(brand[50], 0.5),
          },
          '& .MuiTableCell-root': {
            backgroundColor: 'transparent',
          },
        },
      }),
      head: {
        '&:hover': {
          backgroundColor: 'transparent !important',
          transform: 'none !important',
          boxShadow: 'none !important',
        },
      },
    },
  },

  MuiTableHead: {
    styleOverrides: {
      root: ({ theme }) => ({
        background: theme.palette.mode === 'light'
          ? `linear-gradient(135deg, ${gray[50]} 0%, ${gray[100]} 100%)`
          : `linear-gradient(135deg, ${gray[800]} 0%, ${gray[900]} 100%)`,
        '& .MuiTableSortLabel-root': {
          color: theme.palette.text.primary,
          fontWeight: 600,
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          '&:hover': {
            color: brand[500],
            '& .MuiTableSortLabel-icon': {
              opacity: 1,
              color: brand[500],
            },
          },
          '&.Mui-active': {
            color: brand[500],
            fontWeight: 700,
            '& .MuiTableSortLabel-icon': {
              opacity: 1,
              color: brand[500],
            },
          },
        },
        '& .MuiTableSortLabel-icon': {
          opacity: 0.5,
          transition: 'all 0.2s ease-in-out',
          fontSize: '1.25rem',
        },
      }),
    },
  },

  MuiTableSortLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&:hover': {
          color: brand[500],
        },
        '&.Mui-active': {
          color: brand[500],
          fontWeight: 600,
        },
      }),
      icon: ({ theme }) => ({
        color: `${brand[500]} !important`,
        opacity: 0.5,
        transition: 'all 0.2s ease-in-out',
      }),
    },
  },

  MuiTableContainer: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 16,
        background: theme.palette.mode === 'light'
          ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${gray[50]} 100%)`
          : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${gray[900]} 100%)`,
        border: `1px solid ${theme.palette.mode === 'light' ? gray[200] : gray[800]}`,
        boxShadow: theme.palette.mode === 'light'
          ? '0 8px 32px rgba(0, 0, 0, 0.1)'
          : '0 8px 32px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        overflow: 'hidden',
        '& .MuiTable-root': {
          borderCollapse: 'separate',
          borderSpacing: 0,
        },
      }),
    },
  },

  MuiTable: {
    styleOverrides: {
      root: {
        tableLayout: 'auto',
        '& .MuiTableHead-root .MuiTableCell-root': {
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            width: 0,
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${brand[500]}, transparent)`,
            transition: 'width 0.3s ease-in-out',
            transform: 'translateX(-50%)',
          },
          '&:hover::after': {
            width: '80%',
          },
        },
      },
    },
  },

  MuiTableBody: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiTableRow-root:last-child .MuiTableCell-root': {
          borderBottom: 'none',
        },
        '& .MuiTableRow-root': {
          '&:nth-of-type(even)': {
            backgroundColor: theme.palette.mode === 'light'
              ? alpha(gray[50], 0.3)
              : alpha(gray[900], 0.3),
          },
          '&:hover': {
            '&:nth-of-type(even)': {
              backgroundColor: alpha(theme.palette.action.hover, 0.4),
            },
          },
        },
      }),
    },
  },

  MuiIcon: {
    defaultProps: {
      fontSize: 'small',
    },
    styleOverrides: {
      root: {
        variants: [
          {
            props: {
              fontSize: 'small',
            },
            style: {
              fontSize: '1rem',
            },
          },
        ],
      },
    },
  },
};
