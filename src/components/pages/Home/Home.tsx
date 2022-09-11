import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import BaseLayout from '../../templates/BasetLayout/BaseLayout';
import { AuthContext } from '../../../provider/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';

const Home = () => {
  const { user, signOut, auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log('sign out!!');
      navigate('/login', { replace: true });
    });
  };

  return (
    <BaseLayout>
      {user ? (
        <>
          <div>{user.email}</div>
          <div>
            <Button onClick={handleSignOut}>Sign Out</Button>
          </div>
        </>
      ) : (
        <Navigate to={'/login'} />
      )}
    </BaseLayout>
  );
};

export default Home;
