import { StDiv } from "../style/FormStyle";

const DetailInput = ({ engName, korName, value }) => {
  return (
    <StDiv>
      <label htmlFor={engName}>{korName}</label>
      <input
        type={engName === "amount" ? "number" : "text"}
        id={engName}
        ref={value}
      />
    </StDiv>
  );
};

export default DetailInput;
