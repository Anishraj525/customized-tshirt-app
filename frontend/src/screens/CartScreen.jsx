import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartScreen = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // 🔐 Protect Route
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/", { replace: true }); // ✅ FIXED (was /login)
    } else {
      setUser(storedUser);

      const cartKey = `cart_${storedUser.email}`;
      const storedCart = localStorage.getItem(cartKey);
      setCartItems(storedCart ? JSON.parse(storedCart) : []);
    }
  }, [navigate]);

  if (!user) return null;

  const cartKey = `cart_${user.email}`;

  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
  };

  const itemsCount = cartItems.reduce(
    (acc, item) => acc + (item.qty || 1),
    0
  );

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.qty || 1) * item.price,
    0
  );

  const checkoutHandler = () => {
    if (cartItems.length === 0) {
      alert("🛒 Your cart is empty!");
      return;
    }

    navigate("/checkout");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div style={{ marginTop: "20px" }}>
          <h3>Your cart is empty</h3>
          <button
            style={{ marginTop: "10px" }}
            onClick={() => navigate("/home")} // ✅ FIXED
          >
            Go Back To Home
          </button>
        </div>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "8px",
              }}
            >
              <h4>{item.name}</h4>
              <p>Price: ₹{item.price}</p>
              <p>Quantity: {item.qty || 1}</p>

              <button
                onClick={() => removeFromCart(index)}
                style={{
                  marginTop: "10px",
                  backgroundColor: "#ff4d4d",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <h3>
            Subtotal ({itemsCount} items): ₹{totalPrice}
          </h3>

          <button
            onClick={checkoutHandler}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#000",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Proceed To Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartScreen;