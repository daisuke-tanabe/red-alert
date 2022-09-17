import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { AuthContext } from '../../../provider/AuthProvider';
import Header from '../../organisms/Header/Header';

const Main = styled.div`
  display: flex;
  padding: 40px;
`;

const Home = () => {
  const { user } = useContext(AuthContext);
  const userPhoto = user && user.photoURL ? user.photoURL.replace('normal', 'bigger') : '';
  const headerProps = { userPhoto };

  return (
    <>
      {user ? (
        <>
          <Header {...headerProps} />
          <Main>
            <div>{user.email}</div>
          </Main>
        </>
      ) : (
        <Navigate to={'/login'} />
      )}
    </>
  );
};

export default Home;
