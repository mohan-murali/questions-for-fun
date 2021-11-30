import { useContext } from "react";
import { AuthProviderContext, AuthProviderContextProps } from "./AuthProvider";

export const useAuth = (): AuthProviderContextProps => {
  const context = useContext(AuthProviderContext);

  return { ...context };
};
