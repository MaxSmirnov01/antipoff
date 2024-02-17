import { createContext } from 'react';

type Auth = {
  loggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
};

export const AuthContext = createContext({} as Auth);
