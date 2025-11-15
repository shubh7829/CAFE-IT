import React from "react";
import axios from "axios";

export default function PaymentPage() {
  const handlePayment = async () => {
    // 1. Call backend to create order
    const { data } = await axios.post("http://localhost:5000/api/payment/order", {
      amount: 50000, // amount in paise (₹500)
      currency: "INR",
    });

    // 2. Options for Razorpay checkout
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: data.amount,
      currency: data.currency,
      name: "CAFE'IT Booking",
      description: "Payment for Booking",
      order_id: data.id,
      handler: function (response) {
        alert("Payment successful!");
        // Send payment info to backend to verify
        axios.post("http://localhost:5000/api/payment/verify", response);
      },
      prefill: {
        name: "Shubh",
        email: "shubh@example.com",
        contact: "9999999999",
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Pay for Your Booking</h1>
      <p>Amount: ₹500</p>
      <button onClick={handlePayment} className="bg-blue-600 text-white px-4 py-2 rounded">
        Pay Now
      </button>
    </div>
  );
}
