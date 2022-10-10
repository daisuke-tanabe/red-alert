import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Container, IconButton, InputAdornment, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { AuthContext } from '../../../lib/AuthProvider';
import TextField from '../../atoms/TextField';
import FullLayout from '../../templates/FullLayout/FullLayout';

type EmailInputFieldProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const EmailInputField = (props: EmailInputFieldProps) => (
  <TextField
    autoComplete="email"
    id="email"
    label="Email"
    type="email"
    value={props.value}
    onChange={props.onChange}
    fullWidth
  />
);

type CurrentPasswordInputFieldProps = {
  value: string;
  isShowPassword: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickTogglePassword: () => void;
};
const CurrentPasswordInputField = (props: CurrentPasswordInputFieldProps) => {
  return (
    <TextField
      autoComplete="current-password"
      id="current-password"
      label="Password"
      type={props.isShowPassword ? 'text' : 'password'}
      value={props.value}
      onChange={props.onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={props.onClickTogglePassword} edge="end">
              {props.isShowPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      fullWidth
    />
  );
};

const Login = () => {
  const { user, signIn, auth } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', 'current-password': '' });
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleChangeInputField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleClickShowPassword = () => setIsShowPassword((prevState) => !prevState);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user) {
      // userが存在する場合はどうするか
      console.log(user);
      return;
    }
    await signIn({ auth, email: form.email, password: form['current-password'] });
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
                  <EmailInputField value={form.email} onChange={handleChangeInputField} />
                  <CurrentPasswordInputField
                    isShowPassword={isShowPassword}
                    value={form['current-password']}
                    onChange={handleChangeInputField}
                    onClickTogglePassword={handleClickShowPassword}
                  />
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
