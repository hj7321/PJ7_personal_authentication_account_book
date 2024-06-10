import {
  StSection,
  StH3,
  StIdPw,
  StLoginBox,
  StLabel,
  StInput,
  StButton,
} from "../style/LoginStyle";

const Login = () => {
  return (
    <StSection>
      <StH3>로그인</StH3>
      <StLoginBox>
        <StIdPw>
          <label>
            아이디 <StInput type="text" />
          </label>
          <StLabel>
            비밀번호 <StInput type="password" />
          </StLabel>
        </StIdPw>
        <StButton $login>로그인</StButton>
      </StLoginBox>
      <StButton>회원가입 하기</StButton>
    </StSection>
  );
};

export default Login;
