import styled from "styled-components";

export const StDiv = styled.div`
  display: flex;
  text-align: center;
  align-content: center;
  font-weight: bold;
`;

export const StP = styled.p`
  width: 650px;
  white-space: nowrap; /* 텍스트 줄 바꿈 방지 */
  overflow: hidden; /* 넘치는 텍스트 숨기기 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 ... 표시 */
`;
