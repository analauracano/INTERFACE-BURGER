import { useState } from "react"; 
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"; 
import { useLocation, useNavigate } from "react-router-dom"; 
import '../styles.css'
import { useCart } from "../../../hooks/CartContext";
import { api } from "../../../services/api";
import { toast } from "react-toastify";

export function CheckoutForm() { 
  const { cartProducts, clearCart } = useCart();
  const Navigate = useNavigate();

  const stripe = useStripe(); 
  const elements = useElements(); 
  const { state: { dpmCheckerLink }, } = useLocation()

const [message, setMessage] = useState(null);
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
        console.error('Stripe ou Elements com falha, tente novamente')
        return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
    });

    if (error) {
        setMessage(error.message);
        toast.error(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        try{
        const products = cartProducts.map((product) => {
          return {
            id: product.id,
            quantity: product.quantity,
            price: product.price,
          };
        })

        await api.post("/orders", {products
              },);
        
              toast.success("Pedido realizado com sucesso!");
              Navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`);
              clearCart();
        
            } catch (error) {
              toast.error("Não foi possível realizar o pedido.");
            }
            
    } else {
      Navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`)
    }

    setIsLoading(false);

};

const paymentElementOptions = {
    layout: "accordion"
}

return (
    <div className="container">
        <form id="payment-form" onSubmit={handleSubmit}>

            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button disabled={isLoading || !stripe || !elements} id="submit" className="button">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pagar Agora"}
                </span>
            </button>
           
            {message && <div id="payment-message">{message}</div>}
        </form>
        <div id="dpm-annotation">
            <p>
              Os métodos de pagamento são disponibilizados de acordo com a sua região.&nbsp;
                <a
                    href={dpmCheckerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="dpm-integration-checker"
                >
                    Ver métodos de pagamentos
                </a>
            </p>
        </div>
    </div>
);
}