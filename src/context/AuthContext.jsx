import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../shared/axiosInstance";

export const AuthContext = createContext(null);

const token = localStorage.getItem("accessToken");

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const { data } = await axiosInstance.get("/user", {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(data);
      } catch (error) {
        navigate("/login");
      }
    };
    fetchUserInfo();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, userInfo, setUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
