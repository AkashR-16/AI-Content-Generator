import { createContext, useContext, useEffect, useState } from "react";
import { checkUserAuthStatusAPI } from "../apis/user/userrsapi";
import { useQuery } from "@tanstack/react-query";

export const AuthContext = createContext();

export const Authprovider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //make req using useQuery
  const { isError, isLoading, data, isSuccess } = useQuery({
    queryFn: checkUserAuthStatusAPI,
    queryKey: ["checkAuth"],
  });
  //update auth user
  useEffect(() => {
    if (isSuccess) {
      setIsAuthenticated(data);
    }
  }, [data, isSuccess]);

  //update user after login
  const login = () => {
    setIsAuthenticated(true);
  };
  //update user after logout
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isError, isLoading, isSuccess, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
