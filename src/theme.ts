import React from 'react';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    siteName: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    siteName?: React.CSSProperties;
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    siteName: true;
  }
}

const theme = createTheme({
  // https://mui.com/material-ui/customization/default-theme/?expand-path=$.palette
  palette: {
    common: {
      black: '#222',
      white: '#fff',
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
    siteName: {
      color: '#fff',
      fontSize: '1.25rem',
      fontWeight: 'bold',
    },
    body1: {
      fontSize: '0.875rem',
    },
  },
});

export default theme;
