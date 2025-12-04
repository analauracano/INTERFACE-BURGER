import { yupResolver } from '@hookform/resolvers/yup';
import { ImageIcon } from '@phosphor-icons/react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Container, ContainerCheckBox, ErrorMessage, Form, Input, InputGroup, Label, LabelUpload, Select, SubmitButton } from './styles';
import { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const schema = yup.object({
  name: yup.string().required('Digite o nome do produto'),
  price: yup.number().positive('Digite o preço').required().typeError('Digite o preço'),
  category: yup.object().required('Escolha uma categoria'),
  offer: yup.bool(),
});

export function EditProduct() {
  const [fileName, setFileName] = useState(null);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const { state: { product } } = useLocation();

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('/categories');
      setCategories(data);
    }
    loadCategories();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const productFormData = new FormData();

    productFormData.append('name', data.name);
    productFormData.append('price', data.price);
    productFormData.append('category_id', data.category.id);
    productFormData.append('offer', data.offer);

    if (data.file && data.file.length > 0) {
      productFormData.append('file', data.file[0]);
    }

    await toast.promise(
      api.put(`/products/${product.id}`, productFormData),
      {
        pending: 'Editando produto',
        success: 'Produto editado com sucesso',
        error: 'Falha ao editar o produto, tente novamente',
      }
    );

    setTimeout(() => {
      navigate('/admin/produtos')
    }, 2000)
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Label>Nome</Label>
          <Input type="text" {...register("name")} defaultValue={product.name} />
          <ErrorMessage>{errors?.name?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <Label>Preço</Label>
          <Input type="number" {...register("price")} defaultValue={product.price / 100} />
          <ErrorMessage>{errors?.price?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <LabelUpload>
            <ImageIcon />
            <input
              type="file"
              accept="image/png, image/jpeg"
              {...register("file")}
              onChange={(e) => {
                setFileName(e.target.files[0]?.name || null);
                register("file").onChange(e);
              }}
            />
            {fileName || "Upload do Produto"}
          </LabelUpload>
          <ErrorMessage>{errors?.file?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <Label>Categoria</Label>
          <Controller
            name="category"
            control={control}
            defaultValue={product.category}
            render={({ field }) => (
              <Select
                {...field}
                options={categories}
                getOptionLabel={(category) => category.name}
                getOptionValue={(category) => category.id}
                placeholder="Categorias"
                menuPortalTarget={document.body}
              />
            )}
          />
          <ErrorMessage>{errors?.category?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <ContainerCheckBox>
            <input type="checkbox" defaultChecked={product.offer} {...register("offer")} />
            <Label>Produto em Oferta?</Label>
          </ContainerCheckBox>
        </InputGroup>

        <SubmitButton>Editar Produto</SubmitButton>
      </Form>
    </Container>
  );
}
