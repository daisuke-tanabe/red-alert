import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  // https://mui.com/material-ui/customization/default-theme/?expand-path=$.palette
  palette: {
    common: {
      black: '#222',
      white: '#fff',
    },
    primary: {
      main: '#bb1037',
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
});

export default theme;
