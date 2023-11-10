import { createTheme } from '@mui/material/styles';
import '@fontsource/nunito-sans';
import * as colors from './index';
import { checkboxClasses } from '@mui/material';

interface Color {
  [key: string | number]: string;
}
declare module '@mui/material/styles' {
  interface Palette {
    color: {
      primary: Color;
      secondary: Color;
      grey: Color;
      white: Color;
      orange: Color;
      red: Color;
      green: Color;
      yellow: Color;
      blue: Color;
    };
  }

  interface PaletteOptions {
    color?: unknown;
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: 'Nunito Sans',
  },

  palette: {
    color: {
      primary: colors.primary,
      secondary: colors.secondary,
      grey: colors.grey,
      white: colors.white,
      orange: colors.orange,
      red: colors.red,
      green: colors.green,
      yellow: colors.yellow,
      blue: colors.blue,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          overflow: 'auto !important',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: `1px solid ${colors.secondary[700]}`,
            outline: 'none',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            background: colors.secondary[50],
            '&:hover, &:active, &:focus': {
              background: colors.secondary[50],
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: `1px solid ${colors.secondary[700]}`,
            outline: 'none',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: colors.grey[800],
          [`&.${checkboxClasses.checked}`]: {
            color: colors.secondary[500],
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        listbox: {
          '& .MuiAutocomplete-option[aria-selected="true"]': {
            background: colors.secondary[50],
            '&:hover': {
              background: colors.secondary[50],
            },
            '&.Mui-focused': {
              background: colors.secondary[50],
            },
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: colors.secondary[1000],
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          color: colors.grey[800],
          fontSize: 16,
          lineHeight: '20px',
          fontWeight: 600,
          '&.Mui-selected': {
            color: colors.secondary[1000],
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        outlined: {
          color: colors.white['A700'],
          '&.Mui-focused': {
            color: colors.secondary[700],
          },
        },
      },
    },
  },
});
