import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/UserContext";

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
import { Button, GoogleButton } from "../../components";
import { api } from "../../services/api";
import { signInWithGooglePopup } from "../../services/firebase";

export function Login() {
  
  const navigate = useNavigate();
  const { putUserData } = useUser()

  const schema = yup.object({
    email: yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
    password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Digite uma senha'),
  }).required()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);

  const onSubmit = async (data) => {
      const {data: userData} = await toast.promise(
        api.post("/sessions",
        {
          email: data.email,
          password: data.password
        }),
        {
          pending: "Verificando seus dados...",
          success:{
            render() {
              setTimeout(() => {
                navigate('/');
              }, 2000);
              return "Login realizado com sucesso! 👌";
            },
          },
          error: "Email ou senha incorretos! 🤯",
        },
      );
      
    putUserData(userData)
  };

const handleGoogleLogin = async () => {
  try {
    // Faz login com Google via Firebase
    const googleResult = await signInWithGooglePopup();
    const firebaseUser = googleResult.user;

    // Pega o token do Firebase
    const idToken = await firebaseUser.getIdToken();

    // Envia para o backend, igual ao login normal
    const { data: userData } = await toast.promise(
      api.post("/sessions/google", { idToken }),
      {
        pending: "Autenticando com Google...",
        success: "Login com Google realizado! ✅",
        error: "Erro ao autenticar com Google ❌",
      }
    );

    // userData deve ter { token, nome, email, etc } igual ao login normal
    putUserData(userData); // atualiza UserContext

    // Salva no localStorage igual login normal
    localStorage.setItem("devburger:token", userData.token);
    localStorage.setItem("devburger:user", JSON.stringify(userData));

    // Redireciona para home
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
