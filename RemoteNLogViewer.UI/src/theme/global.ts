import { css } from "@emotion/core";

export default css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html,
  body,
  #root {
    height: 100%;
    font-family: "Raleway", sans-serif;
  }

  body {
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    background-color: #f5f5f5;
  }

  button {
    cursor: pointer;
  }

  a:focus {
    text-decoration: none;
  }
`;
