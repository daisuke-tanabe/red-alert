import React from 'react';
import { createRoot } from 'react-dom/client';
import Front from './components/pages/Front';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import theme from '../src/theme';
import GlobalStyle from './GlobalStyle';

const emotionCache = createCache({
  key: 'red-alert',
});

const root = createRoot(document.getElementById('app') as HTMLElement);

root.render(
  <CacheProvider value={emotionCache}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <Front />
    </ThemeProvider>
  </CacheProvider>,
);
