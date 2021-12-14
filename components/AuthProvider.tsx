import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { LoginFormData } from "../pages/login";
import { SignUpFormData } from "../pages/signup";

export interface AuthProviderContextProps {
  user?: User;
  authToken: string | null;
  signUp: (data: SignUpFormData) => void;
  login: (data: LoginFormData) => void;
  signOut: () => void;
  fetchedToken: boolean;
}

export interface User {
  name: string;
  email: string;
  type: string;
}

export const AuthProviderContext = createContext<AuthProviderContextProps>(
  {} as AuthProviderContextProps
);

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [fetchedToken, setFetchedTokenn] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | undefined>();

  const getAuthToken = () => {
    if (window) {
      const token = window.localStorage.getItem("auth-token");
      setAuthToken(token);
      setFetchedTokenn(true);
    }
  };

  const signUp = async (data: SignUpFormData) => {
    try {
      const res = await axios.post("/api/signup", data);
      if (window) {
        window.localStorage.setItem("auth-token", res.data.token);
      }
      setUser({ ...res.data.user });
    } catch (ex) {
      console.log(ex);
    }
  };

  const login = async (data: LoginFormData) => {
    try {
      const res = await axios.post("/api/login", data);
      if (window) {
        window.localStorage.setItem("auth-token", res.data.token);
      }
      setUser({ ...res.data.user });
    } catch (ex) {
      console.log(ex);
    }
  };

  const signOut = () => {
    window.localStorage.removeItem("auth-token");
    setUser(undefined);
    setAuthToken(null);
  };

  useEffect(() => {
    setFetchedTokenn(false);
    getAuthToken();
  }, [authToken]);

  return (
    <AuthProviderContext.Provider
      value={{ user, authToken, signUp, login, signOut, fetchedToken }}
    >
      {children}
    </AuthProviderContext.Provider>
  );
};
