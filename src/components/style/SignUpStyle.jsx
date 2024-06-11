import styled from "styled-components";

export const StMessage = styled.p`
  margin: ${(props) => (props.$show ? 10 : 0)}px;
  font-size: 13.5px;
  color: gray;
  padding-left: ${(props) => (props.$pw ? 75 : 45)}px;
`;
