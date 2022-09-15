import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { AuthContext } from '../../../provider/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '../../organisms/Header/Header';
import styled from '@emotion/styled';

const Main = styled.div`
  display: flex;
  padding: 40px;
`;

const Home = () => {
  const { user, signOut, auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const userPhoto = user && user.photoURL ? user.photoURL.replace('normal', 'bigger') : '';
  const headerProps = { userPhoto };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log('sign out!!');
      navigate('/login', { replace: true });
    });
  };

  return (
    <>
      {user ? (
        <>
          <Header {...headerProps} />
          <Main>
            <div>{user.email}</div>
            <div>
              <Button onClick={handleSignOut}>Sign Out</Button>
            </div>
          </Main>
        </>
      ) : (
        <Navigate to={'/login'} />
      )}
    </>
  );
};

export default Home;
