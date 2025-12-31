
import React from "react";


const RazorpayPayment = () => {
  const handlePayment = async () => {
    const amount = 10000; // Amount in INR

    // Step 1: Create order
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const order = await response.json();

    // Step 2: Open Razorpay payment form
    const options = {
      key: "rzp_test_AgxdcM8Zt1za5y" , // Razorpay Key ID
      amount: order.amount,
      currency: order.currency,
      name: "Onex",
      description: "Payment for services",
      order_id: order.id,
      handler: async function (response) {
        // Step 3: Verify payment on the backend
        const verifyResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/verify-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_id: order.id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signaturee: response.razorpay_signature,
          }),
        });

        const verifyData = await verifyResponse.json();
        alert(verifyData.message);
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return <button onClick={handlePayment} style={{
    backgroundColor: "#3399cc",
    color: "white",
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }}
  >Add Funds To Account</button>;
};

export default RazorpayPayment;
