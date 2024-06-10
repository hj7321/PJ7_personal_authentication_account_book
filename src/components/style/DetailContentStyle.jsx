import styled from "styled-components";

export const StSection = styled.section`
  flex-direction: column;
  gap: 15px;
`;

export const StButton = styled.button`
  border-radius: 5px;
  width: fit-content;
  height: 40px;
  padding: 10px 20px;
  font-size: 14px;
  border: 2px solid ${(props) => props.$color};
  background-color: ${(props) => props.$color};
  color: white;
  &:hover {
    background-color: ${(props) => props.$color};
    font-weight: bold;
  }
`;

export const StDiv = styled.div`
  display: flex;
  gap: 8px;
`;
