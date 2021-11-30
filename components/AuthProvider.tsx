import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { LoginFormData } from "../pages/login";
import { SignUpFormData } from "../pages/signup";

export interface AuthProviderContextProps {
  authToken: string | null;
  signUp: (data: SignUpFormData) => void;
  login: (data: LoginFormData) => void;
}

export const AuthProviderContext = createContext<AuthProviderContextProps>(
  {} as AuthProviderContextProps
);

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  const getAuthToken = () => {
    if (window) {
      const token = window.localStorage.getItem("auth-token");
      setAuthToken(token);
    }
  };

  const signUp = async (data: SignUpFormData) => {
    try {
      const res = await axios.post("/api/signup", data);
      if (window) {
        window.localStorage.setItem("auth-token", res.data.token);
      }
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
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => getAuthToken(), [authToken]);

  return (
    <AuthProviderContext.Provider value={{ authToken, signUp, login }}>
      {children}
    </AuthProviderContext.Provider>
  );
};
