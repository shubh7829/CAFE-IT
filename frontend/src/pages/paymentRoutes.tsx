import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";

// Initialize Stripe with your public key
const stripePromise = loadStripe("pk_test_your_public_key_here");

function Checkout() {
  const stripe = useStripe();
  const elements = useElements();

  const handlePay = async () => {
    if (!stripe || !elements) {
      alert("Stripe has not loaded yet. Please wait...");
      return;
    }

    // Call backend to create payment intent
    const res = await fetch("http://localhost:5000/api/payments/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 5000, currency: "inr" }), // 5000 = ₹50
    });

    const { clientSecret } = await res.json();

    // Confirm payment on client
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    if (result.error) {
      console.error(result.error.message);
      alert(`Payment failed: ${result.error.message}`);
    } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
      alert("Payment successful 🎉");
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <CardElement />
      <button onClick={handlePay} disabled={!stripe}>
        Pay ₹50
      </button>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
}
