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
import { api } from "../../services/api";

export function Register() {
  
  const navigate = useNavigate();

  const schema = yup.object({
    name: yup.string().required("O nome é obrigatório"),
    email: yup.string().email().required("O email é obrigatório"),
    password: yup.string().min(6).required("A senha é obrigatória"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'As senhas devem ser iguais')
      .required("Confirme sua senha"),
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
      await api.post("/users", {
        name: data.name,
        email: data.email,
        password: data.password,
        admin: false
      });

      toast.success("Conta criada com sucesso! 👌");
      navigate("/");

    } catch (error) {

      if (error?.response?.data?.error === "Email already taken!") {
        toast.error("Esse e-mail já está cadastrado!");
        return;
      }

      toast.error("Erro ao criar sua conta 🤯");
      console.log(error);
    }
  };

  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="logo-devburger" />
      </LeftContainer>

      <RightContainer>
        <Title>Criar Conta</Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          
          <InputContainer>
            <label>Nome</label>
            <input type="text" {...register("name")} />
            <p>{errors?.name?.message}</p>
          </InputContainer>

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

          <InputContainer>
            <label>Confirmar Senha</label>
            <input type="password" {...register("confirmPassword")} />
            <p>{errors?.confirmPassword?.message}</p>
          </InputContainer>

          <Button type="submit">Criar Conta</Button>

        </Form>

        <p>Já possui conta? <Link to="/login">Clique aqui.</Link></p>

      </RightContainer>
    </Container>
  );
}
