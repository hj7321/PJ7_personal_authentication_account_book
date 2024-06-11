import styled from "styled-components";

export const StForm = styled.form`
  gap: 10px;
`;

export const StDiv = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 5px;
`;

export const StButton = styled.button`
  border-radius: 10px;
  width: 100px;
  background-color: #fcd1d8;
  border: 2px solid #fcd1d8;
  border-radius: 5px;
  font-size: 15px;
  &:hover {
    background-color: #fda0b0;
    font-weight: bold;
  }
`;
