import React, { useState, useMemo, useCallback } from 'react';
import { AuthContext } from '../contexts';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const data = localStorage.getItem('token');
  const token = data ? JSON.parse(data) : null;

  const remove = useCallback(() => localStorage.removeItem('token'), []);

  const [loggedIn, setLoggedIn] = useState<boolean>(!!token);

  const authValue = useMemo(
    () => ({
      loggedIn,
      logIn: () => {
        setLoggedIn(true);
      },
      logOut: () => {
        remove();
        setLoggedIn(false);
      },
    }),
    [loggedIn, remove],
  );

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
