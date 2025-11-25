import { Button } from "../Button";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useCart } from "../../hooks/CartContext";
import { api } from "../../services/api";
import { formatPrice } from "../../utils/formatPrice";
import { Container } from "./styles";
import { useNavigate } from "react-router-dom";

export function CartResume(){
  const [finalPrice, setFinalPrice] = useState(0);
  const [deliveryTax] = useState(500);

  const { cartProducts, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const sumAllItems = cartProducts.reduce((acc, current) => {
      return acc + (current.price * current.quantity);
    }, 0);

    setFinalPrice(sumAllItems);
  }, [cartProducts]);

  const submitOrder = async () => {
  const products = cartProducts.map((product) => ({
    id: product.id,
    quantity: product.quantity,
    price: product.price,
  }));

try {
  const { clientSecret } = (await api.post("/create-payment-intent", { products })).data;

  navigate('/checkout', {
    state: { clientSecret },
  });
} catch (err) {
  toast.error("Não foi possível realizar o pedido.");
}
  };

  return(
    <div>
    <Container>
      <div className="container-top">
        <h2 className="title">Resumo do Pedido</h2>
        <p className="items">Itens</p>
        <p className="items-price">{formatPrice(finalPrice)}</p>
        <p className="delivery-tax">Taxa de Entrega</p>
        <p className="delivery-tax-price">{formatPrice(deliveryTax)}</p>
      </div>
      <div className="container-bottom">
        <p>Total</p>
        <p>{formatPrice(finalPrice + deliveryTax)}</p>
      </div>
    </Container>
    <Button onClick={submitOrder}>Finalizar Pedido</Button>
    </div>
  )
}