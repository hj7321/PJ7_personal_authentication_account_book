import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    max-width: 900px;
    min-width: 600px;
    margin: 0 auto;
    background-color: pink;
    display: grid;
  }
  a {
    text-decoration: none;
    color: black;
  }
  button {
    cursor: pointer;
  }
  h3 {
    font-size: 20px;
    font-weight: bold;
  }
  input {
    height: 25px;
  }
  section {
    display: flex;
    background-color: aliceblue;
    border-radius: 10px;
    margin: 10px;
    padding: 20px;
    justify-content: center;
    width: 840px;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 20px;
  }
  li {
    display: flex;
    justify-content: space-between;
    width: 790px;
    border-radius: 8px;
    background-color: #9cffcd;
    padding: 10px;
    line-height: 1.5;
    cursor: pointer;
  }
  select {
    width: 75px;
    height: 30px;
    font-size: 14px;
  }
  li:hover {
    transform: scale(1.02);
    transition-duration: 0.2s;
  }
`;

export default GlobalStyle;
