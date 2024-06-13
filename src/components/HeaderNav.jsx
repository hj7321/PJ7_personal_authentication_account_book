import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const StHeader = styled.header`
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  background-color: #000000c0;
  color: white;
`;

const StDiv = styled.div`
  display: flex;
  gap: ${(props) => (props.$moreGap ? "20px" : "13px")};
  align-items: center;
`;

const StButton = styled.button`
  border-radius: 5px;
  padding: 10px;
  background-color: #fcd1d8;
  border: 2px solid #fcd1d8;
  border-radius: 5px;
  &:hover {
    background-color: #fda0b0;
    font-weight: bold;
    border: 2px solid #fda0b0;
  }
`;

const StImg = styled.img`
  border-radius: 50%;
  width: 50px;
`;

const StLink = styled(Link)`
  font-size: 18px;
  &:hover {
    font-weight: bold;
  }
`;

const HeaderNav = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [image, setImage] = useState("");
  const { isAuthenticated, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) return;
    else {
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
          setNickname(data.nickname);
          setImage(data.avatar ?? "../images/profile.jpg");
        } catch (error) {
          alert(`사용자 정보 불러오기 실패: ${error.message}`);
        }
      };
      fetchUserInfo();
    }
  }, [isAuthenticated]);

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <StHeader>
        <StDiv $moreGap>
          <StLink to="/">Home</StLink>
          <StLink to="profile">Profile</StLink>
        </StDiv>
        <StDiv>
          <StImg src={image}></StImg>
          <span>{nickname}님</span>
          <StButton onClick={logoutHandler}>로그아웃</StButton>
        </StDiv>
      </StHeader>
      <Outlet />
    </>
  );
};

export default HeaderNav;
