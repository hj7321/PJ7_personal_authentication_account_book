import { StDiv } from "../style/FormStyle";

const DetailInput = ({ engName, korName, state }) => {
  return (
    <StDiv>
      <label htmlFor={engName}>{korName}</label>
      <input
        type={engName === "amount" ? "number" : "text"}
        id={engName}
        ref={state}
      />
    </StDiv>
  );
};

export default DetailInput;
