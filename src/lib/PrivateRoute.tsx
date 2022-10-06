import React, { useContext } from 'react';
import { Outlet, Navigate, RouteProps } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const { user } = useContext(AuthContext);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
