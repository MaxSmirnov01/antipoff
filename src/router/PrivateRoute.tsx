import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import paths from './paths';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  if (auth.loggedIn) {
    return children;
  }
  return <Navigate to={paths.loginPath()} />;
};

export default PrivateRoute;
