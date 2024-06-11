import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { StMessage } from "../style/SignUpStyle";
import useValidate from "../hooks/useValidate";

const SignUp = () => {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputName, setInputName] = useState("");

  const [idMsg, setIdMsg] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [nameMsg, setNameMsg] = useState("");

  const navigate = useNavigate();

  useValidate({
    inputValue: inputId,
    setValueMsg: setIdMsg,
    str: "아이디는",
    min: 4,
    max: 10,
  });

  useValidate({
    inputValue: inputPw,
    setValueMsg: setPwMsg,
    str: "비밀번호는",
    min: 4,
    max: 15,
  });

  useValidate({
    inputValue: inputName,
    setValueMsg: setNameMsg,
    str: "닉네임은",
    min: 1,
    max: 10,
  });

  return (
    <StSection>
      <StH3>회원가입</StH3>
      <StLoginBox>
        <StIdPw>
          <label>
            아이디{" "}
            <StInput
              type="text"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
            />
            <StMessage $show={idMsg}>{idMsg}</StMessage>
          </label>
          <StLabel>
            비밀번호{" "}
            <StInput
              type="password"
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
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
            <StMessage $show={nameMsg}>{nameMsg}</StMessage>
          </label>
        </StIdPw>
      </StLoginBox>
      <StButtonBox>
        <StButton $login>회원가입</StButton>
        <StButton
          onClick={() => {
            navigate("/login");
          }}
        >
          로그인 하기
        </StButton>
      </StButtonBox>
    </StSection>
  );
};

export default SignUp;
