import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { AuthContext } from '../../../lib/AuthProvider';
import FullLayout from '../../templates/FullLayout/FullLayout';

type State = {
  email: string;
  password: string;
};

const Login = () => {
  const { user, signIn, auth } = useContext(AuthContext);
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
    console.log(`signIn: ${values.email}:${values.password}`);
    await signIn({ auth, email: values.email, password: values.password });
  };

  return (
    <>
      {user ? (
        <Navigate to={'/'} />
      ) : (
        <FullLayout>
          <Container maxWidth="xs">
            <div
              css={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '-80px',
                marginBottom: '40px',
                display: 'flex',
                padding: '0 20px',
              }}
            >
              <div css={{ color: 'white', fontSize: '36px', fontWeight: 'bold' }}>Red Alert</div>
            </div>
            <Paper css={{ padding: '48px 36px' }}>
              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <TextField id="email" label="Email" value={values.email} onChange={handleChange('email')} fullWidth />
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      id="password"
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
                    Login
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Container>
        </FullLayout>
      )}
    </>
  );
};

export default Login;
