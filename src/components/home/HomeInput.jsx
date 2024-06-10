import { StDiv } from "../style/FormStyle";

const HomeInput = ({ engName, korName, placeholder }) => {
  return (
    <StDiv>
      <label htmlFor={engName}>{korName}</label>
      <input
        type={engName === "amount" ? "number" : "text"}
        id={engName}
        name={engName}
        placeholder={placeholder}
      />
    </StDiv>
  );
};

export default HomeInput;
