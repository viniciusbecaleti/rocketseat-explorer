import styled from "styled-components";

export const Container = styled.button`
  border: none;
  background: none;

  font-size: 16px;
  color: ${({ theme, isActivated }) => isActivated ? theme.COLORS.ORANGE : theme.COLORS.GRAY_100};
`