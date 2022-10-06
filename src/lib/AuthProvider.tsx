import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, type User, Auth } from 'firebase/auth';
import { app } from '../../firebase.config';
import { signIn, signOut, signUp } from './auth';

type UserType = User | null;
type DefaultValue = {
  user: UserType;
  auth: Auth;
  signIn: typeof signIn;
  signUp: typeof signUp;
  signOut: typeof signOut;
};
type AuthProviderProps = {
  children: ReactNode;
};

const auth = getAuth(app);
const defaultValue: DefaultValue = {
  user: null,
  auth,
  signIn,
  signUp,
  signOut,
};
const AuthContext = createContext(defaultValue);

const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const [user, setUser] = useState<UserType>(null);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setIsAuthed(true);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ auth, user, signUp, signIn, signOut }}>{isAuthed && children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
