import styled from "styled-components";

export const StButton = styled.button`
  width: 130px;
  margin-top: ${(props) => (props.$margin ? 30 : 0)}px;
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
`;

export const StH3 = styled.h3`
  font-size: 25px;
  padding-bottom: 20px;
`;

export const StIdPw = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export const StLoginBox = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  padding-bottom: 5px;
`;

export const StLabel = styled.label`
  margin-right: 16px;
`;

export const StInput = styled.input`
  width: 200px;
`;
