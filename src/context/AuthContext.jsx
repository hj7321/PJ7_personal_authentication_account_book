import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    if (!isAuthenticated) return;

    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const { data } = await axios.get(
          "https://moneyfulpublicpolicy.co.kr/user",
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserInfo(data);
      } catch (error) {
        alert(`사용자 정보 불러오기 실패: ${error.message}`);
        navigate("/login");
      }
    };
    fetchUserInfo();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
