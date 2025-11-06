import { Container } from "./styles";
import GoogleIcon from "../../assets/google.svg";

export function GoogleButton({ onClick }) {
  return (
    <Container onClick={onClick}>
      <img src={GoogleIcon} alt="Google logo" width="22" />
      <span>Entrar com Google</span>
    </Container>
  );
}