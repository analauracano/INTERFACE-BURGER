import Logo from '../../assets/Logo 1.svg'
import { Banner, Container, Content, Title } from './styles'

export function Cart(){
  return(
    <Container>
      <Banner>
        <img src={Logo} alt='logo devburger' />
      </Banner>
      <Title>Checkout - Pedido</Title>
      <Content>
        {/* <CartItems />
        <CartResume /> */}
      </Content>
    </Container>
  )
}