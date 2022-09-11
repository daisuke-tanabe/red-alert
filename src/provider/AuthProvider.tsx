import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, signOut as firebaseSignOut, onAuthStateChanged, type User, Auth } from 'firebase/auth';
import { app } from '../../firebase.config';
import signUp from '../lib/auth/signUp';
import signIn from '../lib/auth/signIn';
import signOut from '../lib/auth/signOut';

export type AuthProviderProps = {
  children: ReactNode;
};

export type Value = {
  auth: Auth;
  email: string;
  password: string;
};

export type UserState = User | null;

export type DefaultValue = {
  user: UserState;
  auth: Auth;
  signIn: typeof signIn;
  signUp: typeof signUp;
  signOut: typeof signOut;
};

const authProvider = getAuth(app);

const defaultValue: DefaultValue = {
  user: null,
  auth: authProvider,
  signIn,
  signUp,
  signOut,
};

// 認証状態をグローバルで取り回すコンテクストを作成する
const AuthContext = createContext(defaultValue);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserState>(null);
  const [iSAuthed, setISAuthed] = useState(false);

  const signOut: () => Promise<void> = async () => {
    firebaseSignOut(authProvider)
      .then(() => {
        /* something */
      })
      .catch((error) => {
        /* something */
      });
  };

  useEffect(() => {
    onAuthStateChanged(authProvider, (user) => {
      setUser(user);
      setISAuthed(true);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ auth: authProvider, user, signUp, signIn, signOut }}>
      {iSAuthed && children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
