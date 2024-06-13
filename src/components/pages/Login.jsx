import { useNavigate } from "react-router-dom";
import {
  StSection,
  StH3,
  StIdPw,
  StFormBox,
  StLabel,
  StInput,
  StButton,
} from "../style/LoginStyle";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const id = data.get("id");
    const password = data.get("pw");

    if (!id.trim() || !password.trim())
      return alert("아이디와 비밀번호를 모두 입력해주세요.");

    try {
      const loginObj = { id, password };
      const { data } = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/login",
        loginObj
      );
      console.log(data);
      if (data.success) {
        alert(`${data.nickname}님, 환영합니다!`);
        login(data.accessToken);
        navigate("/");
      } else alert("로그인 실패");
      e.target.reset();
    } catch (error) {
      alert(`로그인 실패: ${error.message}`);
    }
  };

  return (
    <StSection>
      <StH3>로그인</StH3>
      <StFormBox onSubmit={onSubmitHandler}>
        <StIdPw>
          <label>
            아이디 <StInput type="text" name="id" />
          </label>
          <StLabel>
            비밀번호 <StInput type="password" name="pw" />
          </StLabel>
        </StIdPw>
        <StButton type="submit" $margin>
          로그인
        </StButton>
      </StFormBox>
      <StButton
        onClick={() => {
          navigate("/signup");
        }}
      >
        회원가입 하기
      </StButton>
    </StSection>
  );
};

export default Login;
