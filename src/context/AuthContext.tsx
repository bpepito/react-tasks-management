import React, { createContext, useContext, useEffect, useState } from "react";
import { Login } from "../components/LoginPage";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { message } from "antd";
import { jwtDecode } from "jwt-decode";

type CurrentUser = {
  id: any;
  isAdmin: boolean;
  name: string;
  username: string;
};

type AuthContextType = {
  user: Login | null;
  currentUser: CurrentUser;
  login: (login: Login) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<Login | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    id: null,
    isAdmin: false,
    name: "",
    username: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        const decoded: any = jwtDecode(accessToken);

        setCurrentUser({
          id: decoded.sub,
          isAdmin: decoded.isAdmin,
          name: decoded.name,
          username: decoded.username,
        });
      } else {
        localStorage.clear();
      }
    };

    checkToken();
  }, [navigate]);

  const login = async (login: Login) => {
    try {
      const { accessToken } = await AuthService.login(login);

      const decoded: any = jwtDecode(accessToken);

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("id", decoded.sub);
      localStorage.setItem("isAdmin", decoded.isAdmin);
      localStorage.setItem("name", decoded.name);
      localStorage.setItem("username", decoded.username);

      setCurrentUser({
        id: decoded.id,
        isAdmin: decoded.isAdmin,
        name: decoded.name,
        username: decoded.username,
      });

      if (decoded.isAdmin === true) {
        navigate("/dashboard/users");
      } else {
        navigate("/dashboard/my-task");
      }

      message.success("Access Granted!");
    } catch (error: any) {
      console.log("error", error);

      if (error.response && error.response.status < 500) {
        localStorage.clear();
        message.error(
          "Oops! It seems your login details are incorrect. Please check your username and password."
        );
        navigate("/");
      }
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setCurrentUser({ id: null, isAdmin: false, name: "", username: "" });
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
