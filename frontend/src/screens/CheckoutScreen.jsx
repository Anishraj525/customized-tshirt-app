import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CheckoutScreen() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const cartKey = user ? `cart_${user.email}` : null;
  const orderKey = user ? `order_${user.email}` : null;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first");
      return;
    }

    const cartItems =
      JSON.parse(localStorage.getItem(cartKey)) || [];

    if (!name.trim() || !address.trim()) {
      alert("Please fill all fields");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const total = cartItems.reduce(
      (acc, item) => acc + item.qty * item.price,
      0
    );

    const orderData = {
      orderId: "ORD" + Date.now(),
      name: name,                    // ✅ saved properly
      shippingAddress: address,
      items: cartItems,
      total,
    };

    localStorage.setItem(
      orderKey,
      JSON.stringify(orderData)
    );

    localStorage.removeItem(cartKey);

    navigate("/order-success");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Checkout</h2>

      <form onSubmit={handlePlaceOrder}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />
        <br /><br />

        <textarea
          placeholder="Shipping Address"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
        />
        <br /><br />

        <button type="submit">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default CheckoutScreen;