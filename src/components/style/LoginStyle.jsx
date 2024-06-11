import styled from "styled-components";

export const StButton = styled.button`
  width: ${(props) => (props.$login ? "80px" : "130px")};
  padding: 10px;
  background-color: #fcd1d8;
  border: 2px solid #fcd1d8;
  border-radius: 5px;
  font-size: 14px;
  &:hover {
    background-color: #fda0b0;
    font-weight: bold;
  }
`;

export const StSection = styled.section`
  flex-direction: column;
  text-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  margin-top: 70px;
`;

export const StH3 = styled.h3`
  font-size: 25px;
  padding-bottom: 20px;
`;

export const StIdPw = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StLoginBox = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px;
`;

export const StLabel = styled.label`
  margin-right: 16px;
`;

export const StInput = styled.input`
  width: 200px;
`;

export const StButtonBox = styled.div`
  display: flex;
  gap: 10px;
`;
