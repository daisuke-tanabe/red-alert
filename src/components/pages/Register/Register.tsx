import React, { useContext, useState } from 'react';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  AppBar,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Toolbar,
} from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid2 from '@mui/material/Unstable_Grid2';
import { AuthContext } from '../../../lib/AuthProvider';

type State = {
  email: string;
  password: string;
};

const Register = () => {
  const { user, signUp, auth } = useContext(AuthContext);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [values, setValues] = useState<State>({
    email: '',
    password: '',
  });

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user) {
      // userが存在する場合はどうするか
      console.log(user);
      return;
    }
    console.log(`signUp: ${values.email}:${values.password}`);
    await signUp({ auth, email: values.email, password: values.password });
  };

  return (
    <>
      {user ? (
        <Navigate to={'/'} />
      ) : (
        <Grid2 container css={{ height: '100vh' }}>
          <Grid2
            xs={4.5}
            css={{ background: '#bd1333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div css={{ display: 'flex' }}>
              <div css={{ color: 'white', fontSize: '36px', fontWeight: 'bold' }}>Red Alert</div>
            </div>
          </Grid2>
          <Grid2 xs={7.5} css={{ background: '#fff', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="static" css={{ background: 'transparent', alignItems: 'end' }} elevation={0}>
              <Toolbar>
                <Button component={RouterLink} to="/login">
                  Login
                </Button>
              </Toolbar>
            </AppBar>
            <Paper
              css={{
                display: 'flex',
                flex: '1 1 auto',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              elevation={0}
            >
              <form onSubmit={handleSubmit}>
                <Stack spacing={4} css={{ minWidth: '320px' }}>
                  <TextField id="email" label="Email" value={values.email} onChange={handleChange('email')} fullWidth />
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                      autoComplete="new-password"
                      id="new-password"
                      type={isShowPassword ? 'text' : 'password'}
                      value={values.password}
                      onChange={handleChange('password')}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {isShowPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    variant="contained"
                    css={{
                      background: '#bd1333',
                      height: '54px',
                      fontWeight: 'bold',
                    }}
                  >
                    Register
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Grid2>
        </Grid2>
      )}
    </>
  );
};

export default Register;
