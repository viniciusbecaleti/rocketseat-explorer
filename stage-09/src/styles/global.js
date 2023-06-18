import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, input, select, textarea, button {
    font-family: "Roboto Slab", serif;
    font-size: 16px;
    outline: none;
  }

  body {
    color: ${({ theme }) => theme.COLORS.WHITE};
    background: ${({ theme }) => theme.COLORS.BACKGROUND_800};
  }

  a {
    text-align: none;
  }

  a, button {
    cursor: pointer;
    transition: filter 0.2s;
  }

  a:not(:disabled):hover,
  button:not(:disabled):hover {
    filter: brightness(0.9);
  }
`