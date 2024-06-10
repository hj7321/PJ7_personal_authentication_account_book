import {
  StSection,
  StH3,
  StLoginBox,
  StIdPw,
  StLabel,
  StInput,
  StButton,
  StButtonBox,
} from "../style/LoginStyle";

const SignUp = () => {
  return (
    <StSection>
      <StH3>회원가입</StH3>
      <StLoginBox>
        <StIdPw>
          <label>
            아이디 <StInput type="text" />
          </label>
          <StLabel>
            비밀번호 <StInput type="password" />
          </StLabel>
          <label>
            닉네임 <StInput type="text" />
          </label>
        </StIdPw>
      </StLoginBox>
      <StButtonBox>
        <StButton $login>회원가입</StButton>
        <StButton>로그인 하기</StButton>
      </StButtonBox>
    </StSection>
  );
};

export default SignUp;
