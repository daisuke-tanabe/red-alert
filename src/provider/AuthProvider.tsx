import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, type User, Auth } from 'firebase/auth';
import { app } from '../../firebase.config';
import { signIn, signOut, signUp } from '../lib/auth';

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
  const [iSAuthed, setISAuthed] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setISAuthed(true);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ auth, user, signUp, signIn, signOut }}>{iSAuthed && children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
