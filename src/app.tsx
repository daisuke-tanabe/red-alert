import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { createRoot } from 'react-dom/client';
import theme from '../src/theme';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import ProjectPage from './components/pages/ProjectPage/ProjectPage';
import Register from './components/pages/Register/Register';
import { AuthProvider } from './provider/AuthProvider';

const emotionCache = createCache({
  key: 'red-alert',
});

const root = createRoot(document.getElementById('app') as HTMLElement);

root.render(
  <CacheProvider value={emotionCache}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/projects" element={<ProjectPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </CacheProvider>,
);
