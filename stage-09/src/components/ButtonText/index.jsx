import { Container } from "./style";

export function ButtonText({ title, isActivated = false, ...rest }) {
  return (
    <Container
      type="button"
      isActivated={isActivated}
      {...rest}
    >
      {title}
    </Container>
  )
}