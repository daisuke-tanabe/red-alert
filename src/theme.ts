import React from 'react';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    siteName: React.CSSProperties;
    cardTitle: React.CSSProperties;
    cardText: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    siteName?: React.CSSProperties;
    cardTitle: React.CSSProperties;
    cardText: React.CSSProperties;
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    siteName: true;
    cardTitle: true;
    cardText: true;
  }
}

// https://mui.com/material-ui/customization/default-theme/#main-content
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    common: {
      black: '#222',
      white: '#fff',
    },
    background: {
      default: '#F6F7F9',
    },
    text: {
      primary: '#222',
    },
    primary: {
      main: '#ad0a30',
      light: '#f45161',
      dark: '#830012',
      contrastText: '#fff',
    },
    secondary: {
      main: '#efa029',
      light: '#ffd15c',
      dark: '#b77100',
      contrastText: '#222',
    },
  },
  // typographyでは色は指定しないほうがよさそう
  typography: {
    fontFamily: [
      'Helvetica Neue',
      'Arial',
      'Hiragino Kaku Gothic ProN',
      'Hiragino Sans',
      'BIZ UDPGothic',
      'Meiryo',
      'sans-serif',
    ].join(','),
    body1: {
      fontSize: '0.875rem',
    },
    siteName: {
      color: '#fff',
      fontSize: '1.25rem',
      fontWeight: 'bold',
    },
    cardTitle: {
      fontSize: '0.875rem',
      fontWeight: 'bold',
      lineHeight: 1.75,
    },
    cardText: {
      fontSize: '0.8125rem',
      lineHeight: 1.6,
    },
  },
});

export default theme;
