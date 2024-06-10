import styled from "styled-components";

export const StH3 = styled.h3`
  font-size: 25px;
  margin: 20px;
`;

export const StSection = styled.section`
  flex-direction: column;
  text-align: center;
`;

export const GraphContainer = styled.div`
  display: flex;
  align-items: center;
  height: ${(props) => (props.$length ? 40 : 0)}px;
  margin: ${(props) => (props.$length ? 20 : 0)}px;
  margin-top: ${(props) => (props.$length ? 10 : 0)}px;
`;

export const BarSegment = styled.div`
  height: 100%;
  background-color: ${(props) => props.color};
  width: ${(props) => props.width}%;
  transition: width 0.2s ease-in-out;
`;

export const SummaryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-bottom: ${(props) => (props.$length ? 10 : 0)}px;
  overflow: hidden;
`;

export const SummaryItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #555;
`;

export const ColorBox = styled.div`
  width: 20px;
  height: 10px;
  background-color: ${(props) => props.color};
  margin-right: 8px;
`;
