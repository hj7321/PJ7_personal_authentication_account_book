import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";

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

const HeaderNav = () => {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <StHeader>
        <StDiv $moreGap>
          <Link to="/">Home</Link>
          <Link to="profile">Profile</Link>
        </StDiv>
        <StDiv>
          <span>프로필 사진</span>
          <span>닉네임</span>
          <StButton onClick={logoutHandler}>로그아웃</StButton>
        </StDiv>
      </StHeader>
      <Outlet />
    </>
  );
};

export default HeaderNav;
