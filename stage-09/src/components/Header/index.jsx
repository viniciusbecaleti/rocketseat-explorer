import { RiShutDownLine } from "react-icons/ri"

import { Container, Logout, Profile } from "./styles";

export function Header() {
  return (
    <Container>
      <Profile>
        <img
          src="https://github.com/viniciusbecaleti.png"
          alt="Foto de perfil do usuário"
        />

        <div>
          <span>Bem-vindo,</span>
          <strong>Vinicius Becaleti</strong>
        </div>
      </Profile>

      <Logout>
        <RiShutDownLine />
      </Logout>
    </Container>
  )
}