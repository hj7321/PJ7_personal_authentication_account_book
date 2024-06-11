import { useState } from "react";
import {
  StSection,
  StH3,
  StLoginBox,
  StIdPw,
  StLabel,
  StInput,
  StButton,
} from "../style/LoginStyle";
import { useNavigate } from "react-router-dom";
import { StMessage } from "../style/SignUpStyle";
import useValidate from "../hooks/useValidate";
import axios from "axios";

const SignUp = () => {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputName, setInputName] = useState("");

  const [idMsg, setIdMsg] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [nameMsg, setNameMsg] = useState("");

  const navigate = useNavigate();

  useValidate(inputId, setIdMsg, "아이디는", 4, 10);
  useValidate(inputPw, setPwMsg, "비밀번호는", 4, 15);
  useValidate(inputName, setNameMsg, "닉네임은", 1, 10);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!idMsg && !pwMsg && !nameMsg) {
        const newUser = { id: inputId, password: inputPw, nickname: inputName };

        const { data } = await axios.post(
          "https://moneyfulpublicpolicy.co.kr/register",
          newUser
        );

        console.log(data);
        if (data.success) {
          alert("회원가입을 축하드립니다.");
          navigate("/login");
        } else alert("회원가입 실패"); // 에러 나면 무조건 catch문으로 가니까 이거 필요 없나?

        setInputId("");
        setInputPw("");
        setInputName("");
      }
    } catch (error) {
      alert(`회원가입 실패: ${error.message}`);
    }
  };

  return (
    <StSection>
      <StH3>회원가입</StH3>
      <StLoginBox onSubmit={onSubmitHandler}>
        <StIdPw>
          <label>
            아이디{" "}
            <StInput
              type="text"
              name="id"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
            />
            <StMessage $show={idMsg}>{idMsg}</StMessage>
          </label>
          <StLabel>
            비밀번호{" "}
            <StInput
              type="password"
              name="pw"
              value={inputPw}
              onChange={(e) => setInputPw(e.target.value)}
            />
            <StMessage $show={pwMsg} $pw>
              {pwMsg}
            </StMessage>
          </StLabel>
          <label>
            닉네임{" "}
            <StInput
              type="text"
              name="nickname"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
            <StMessage $show={nameMsg}>{nameMsg}</StMessage>
          </label>
        </StIdPw>
        <StButton type="submit" $margin>
          회원가입
        </StButton>
      </StLoginBox>
      <StButton
        onClick={() => {
          navigate("/login");
        }}
      >
        로그인 하기
      </StButton>
    </StSection>
  );
};

export default SignUp;
