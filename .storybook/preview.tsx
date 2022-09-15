import React from "react";
import { Story } from '@storybook/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../src/theme';
import GlobalStyle from '../src/GlobalStyle';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story: Story) => (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];
