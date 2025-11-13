import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { 
  Container, 
  Form, 
  InputContainer, 
  LeftContainer, 
  Link, 
  RightContainer, 
  Title 
} from "./styles";

import Logo from "../../assets/Logo 1.svg";
import { Button } from "../../components/Button";
import { GoogleButton } from "../../components/GoogleButton"; 
import { api } from "../../services/api";
import { signInWithGooglePopup } from "../../services/firebase";

export function Login() {
  
  const navigate = useNavigate();

  const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await toast.promise(
        api.post("/sessions", data),
        {
          pending: "Verificando seus dados...",
          success: "Login realizado com sucesso! 👌",
          error: "Email ou senha incorretos! 🤯",
        }
      );

      const { token, ...userData } = response.data;
      localStorage.setItem("devburger:token", token);
      localStorage.setItem("devburger:user", JSON.stringify(userData));
      navigate("/");

    } catch (error) {
      console.log(error);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const googleResult = await signInWithGooglePopup();
      const firebaseUser = googleResult.user;

      const idToken = await firebaseUser.getIdToken();

      const response = await toast.promise(
        api.post("/sessions/google", { idToken }),
        {
          pending: "Autenticando com Google...",
          success: "Login com Google realizado! ✅",
          error: "Erro ao autenticar com Google ❌"
        }
      );

      const { token, ...userData } = response.data;

      localStorage.setItem("devburger:token", token);
      localStorage.setItem("devburger:user", JSON.stringify(userData));

      navigate("/");

    } catch (error) {
      console.log(error);
      toast.error("Erro ao entrar com Google");
    }
  };

  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="logo-devburger" />
      </LeftContainer>
      <RightContainer>
        <Title>
          Olá, seja bem vindo ao <span>Dev Burguer!</span>
          <br />
          Acesse com seu <span>Login e senha</span>.
        </Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label>Email</label>
            <input type="email" {...register("email")} />
            <p>{errors?.email?.message}</p>
          </InputContainer>
          <InputContainer>
            <label>Senha</label>
            <input type="password" {...register("password")} />
            <p>{errors?.password?.message}</p>
          </InputContainer>
          <Button type="submit">Entrar</Button>
          <GoogleButton onClick={handleGoogleLogin} />

        </Form>

        <p>Não possui conta? <Link to="/cadastro">Clique aqui.</Link></p>
      </RightContainer>

    </Container>
  );
}
