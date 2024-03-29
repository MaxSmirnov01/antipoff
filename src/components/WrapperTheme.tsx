import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    violet: Palette['primary'];
  }

  interface PaletteOptions {
    violet?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    violet: true;
  }
}
declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    violet: true;
  }
}

const WrapperTheme = ({ children }: { children: React.ReactNode }) => {
  const theme = createTheme({
    typography: {
      fontFamily: ['Roboto', 'sans-serif'].join(','),
      h1: {
        fontWeight: 400,
        '@media (max-width: 1000px)': {
          fontSize: '2rem',
        },
      },
      h2: {
        fontWeight: 400,
        '@media (max-width: 1000px)': {
          fontSize: '1rem',
        },
      },
    },
    palette: {
      violet: {
        main: '#512689',
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default WrapperTheme;
