import React from 'react';
import { alpha } from '@mui/material/styles';

import { buttonBaseClasses } from '@mui/material/ButtonBase';
import { dividerClasses } from '@mui/material/Divider';
import { menuItemClasses } from '@mui/material/MenuItem';
import { selectClasses } from '@mui/material/Select';
import { tabClasses } from '@mui/material/Tab';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import { gray, brand } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const navigationCustomizations = {
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 12,
        padding: '12px 16px',
        transition: 'all 0.2s ease-in-out',
        '&:focus-visible': {
          outline: `3px solid ${brand[300]}`,
          outlineOffset: '2px',
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
        },
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
        },
        [`&.${menuItemClasses.selected}`]: {
          backgroundColor: alpha(theme.palette.primary.main, 0.15),
          color: theme.palette.primary.main,
          fontWeight: 600,
          [`&.${menuItemClasses.focusVisible}`]: {
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
          },
        },
        // Screen reader support
        '&[aria-expanded="true"]': {
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
        },
      }),
    },
  },
  MuiMenu: {
    styleOverrides: {
      list: {
        gap: '0px',
        [`&.${dividerClasses.root}`]: {
          margin: '0 -8px',
        },
      },
      paper: ({ theme }) => ({
        marginTop: '4px',
        borderRadius: (theme.vars || theme).shape.borderRadius,
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        backgroundImage: 'none',
        background: 'hsl(0, 0%, 100%)',
        boxShadow:
          'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
        [`& .${buttonBaseClasses.root}`]: {
          '&.Mui-selected': {
            backgroundColor: alpha(theme.palette.action.selected, 0.3),
          },
        },
        ...theme.applyStyles('dark', {
          background: gray[900],
          boxShadow:
            'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px',
        }),
      }),
    },
  },
  MuiSelect: {
    defaultProps: {
      IconComponent: React.forwardRef((props, ref) => (
        <UnfoldMoreRoundedIcon fontSize="small" {...props} ref={ref} />
      )),
    },
    styleOverrides: {
      root: ({ theme }) => ({
        '&:focus-visible': {
          outline: `3px solid ${brand[300]}`,
          outlineOffset: '2px',
        },
        '&.Mui-focused': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: brand[400],
            borderWidth: '2px',
          },
        },
        ...theme.applyStyles('dark', {
          '&:focus-visible': {
            outline: `3px solid ${brand[300]}`,
            outlineOffset: '2px',
          },
        }),
      }),
      select: ({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        '&:focus-visible': {
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
        },
        // Screen reader improvements
        '&[aria-expanded="true"] + .MuiSvgIcon-root': {
          transform: 'rotate(180deg)',
        },
        ...theme.applyStyles('dark', {
          '&:focus-visible': {
            backgroundColor: alpha(theme.palette.primary.main, 0.15),
          },
        }),
      }),
      icon: ({ theme }) => ({
        color: theme.palette.text.secondary,
        transition: 'transform 0.2s ease-in-out',
        right: 12,
        '&.MuiSelect-iconOpen': {
          transform: 'rotate(180deg)',
        },
      }),
    },
  },
  MuiLink: {
    defaultProps: {
      underline: 'none',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        color: (theme.vars || theme).palette.text.primary,
        fontWeight: 500,
        position: 'relative',
        textDecoration: 'none',
        width: 'fit-content',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '1px',
          bottom: 0,
          left: 0,
          backgroundColor: (theme.vars || theme).palette.text.secondary,
          opacity: 0.3,
          transition: 'width 0.3s ease, opacity 0.3s ease',
        },
        '&:hover::before': {
          width: 0,
        },
        '&:focus-visible': {
          outline: `3px solid ${alpha(brand[500], 0.5)}`,
          outlineOffset: '4px',
          borderRadius: '2px',
        },
      }),
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        backgroundColor: (theme.vars || theme).palette.background.default,
      }),
    },
  },
  MuiPaginationItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&.Mui-selected': {
          color: 'white',
          backgroundColor: (theme.vars || theme).palette.grey[900],
        },
        ...theme.applyStyles('dark', {
          '&.Mui-selected': {
            color: 'black',
            backgroundColor: (theme.vars || theme).palette.grey[50],
          },
        }),
      }),
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: { minHeight: 'fit-content' },
      indicator: ({ theme }) => ({
        backgroundColor: (theme.vars || theme).palette.grey[800],
        ...theme.applyStyles('dark', {
          backgroundColor: (theme.vars || theme).palette.grey[200],
        }),
      }),
    },
  },
  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: '12px 16px',
        marginBottom: '8px',
        textTransform: 'none',
        minWidth: 'fit-content',
        minHeight: 'fit-content',
        color: theme.palette.text.secondary,
        borderRadius: 12,
        border: '1px solid',
        borderColor: 'transparent',
        transition: 'all 0.2s ease-in-out',
        fontWeight: 500,
        fontSize: '0.875rem',
        '&:focus-visible': {
          outline: `3px solid ${brand[300]}`,
          outlineOffset: '2px',
        },
        '&:hover': {
          color: theme.palette.text.primary,
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
          borderColor: alpha(theme.palette.primary.main, 0.2),
          transform: 'translateY(-1px)',
        },
        [`&.${tabClasses.selected}`]: {
          color: theme.palette.primary.main,
          fontWeight: 600,
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          borderColor: alpha(theme.palette.primary.main, 0.3),
        },
        ...theme.applyStyles('dark', {
          '&:hover': {
            color: theme.palette.text.primary,
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            borderColor: alpha(theme.palette.primary.main, 0.3),
          },
          [`&.${tabClasses.selected}`]: {
            color: theme.palette.primary.light,
            backgroundColor: alpha(theme.palette.primary.main, 0.15),
            borderColor: alpha(theme.palette.primary.main, 0.4),
          },
        }),
      }),
    },
  },
  MuiStepConnector: {
    styleOverrides: {
      line: ({ theme }) => ({
        borderTop: '1px solid',
        borderColor: (theme.vars || theme).palette.divider,
        flex: 1,
        borderRadius: '99px',
      }),
    },
  },
  MuiStepIcon: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: 'transparent',
        border: `1px solid ${gray[400]}`,
        width: 12,
        height: 12,
        borderRadius: '50%',
        '& text': {
          display: 'none',
        },
        '&.Mui-active': {
          border: 'none',
          color: (theme.vars || theme).palette.primary.main,
        },
        '&.Mui-completed': {
          border: 'none',
          color: (theme.vars || theme).palette.success.main,
        },
        ...theme.applyStyles('dark', {
          border: `1px solid ${gray[700]}`,
          '&.Mui-active': {
            border: 'none',
            color: (theme.vars || theme).palette.primary.light,
          },
          '&.Mui-completed': {
            border: 'none',
            color: (theme.vars || theme).palette.success.light,
          },
        }),
        variants: [
          {
            props: { completed: true },
            style: {
              width: 12,
              height: 12,
            },
          },
        ],
      }),
    },
  },
  MuiStepLabel: {
    styleOverrides: {
      label: ({ theme }) => ({
        '&.Mui-completed': {
          opacity: 0.6,
          ...theme.applyStyles('dark', { opacity: 0.5 }),
        },
      }),
    },
  },

  // Additional accessibility enhancements
  MuiListItemButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&:focus-visible': {
          outline: `3px solid ${brand[300]}`,
          outlineOffset: '2px',
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
        },
        '&[aria-current="page"]': {
          backgroundColor: alpha(theme.palette.primary.main, 0.15),
          color: theme.palette.primary.main,
          fontWeight: 600,
        },
      }),
    },
  },

  MuiBreadcrumbs: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiBreadcrumbs-separator': {
          color: theme.palette.text.secondary,
        },
        '& .MuiLink-root': {
          '&:focus-visible': {
            outline: `3px solid ${brand[300]}`,
            outlineOffset: '2px',
          },
        },
      }),
    },
  },

  MuiPagination: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiPaginationItem-root': {
          '&:focus-visible': {
            outline: `3px solid ${brand[300]}`,
            outlineOffset: '2px',
          },
        },
      }),
    },
  },

  MuiBottomNavigationAction: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&:focus-visible': {
          outline: `3px solid ${brand[300]}`,
          outlineOffset: '2px',
        },
        '&.Mui-selected': {
          '& .MuiBottomNavigationAction-label': {
            fontSize: '0.75rem',
            fontWeight: 600,
          },
        },
      }),
    },
  },

  MuiSpeedDialAction: {
    styleOverrides: {
      fab: ({ theme }) => ({
        '&:focus-visible': {
          outline: `3px solid ${brand[300]}`,
          outlineOffset: '2px',
        },
      }),
    },
  },
};
