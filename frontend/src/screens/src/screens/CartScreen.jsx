import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CartScreen.css";

function CartScreen() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("id");
  const qtyParam = queryParams.get("qty");
  const qty = qtyParam ? parseInt(qtyParam) : 1;

  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  // ADD TO CART (if coming from product page)
  useEffect(() => {
    const addToCart = async () => {
      if (!productId) return;

      const res = await fetch(
        `http://localhost:5000/api/products/${productId}`
      );
      const data = await res.json();

      setCartItems((prevItems) => {
        const existItem = prevItems.find(
          (item) => item._id === data._id
        );

        let updatedCart;

        if (existItem) {
          updatedCart = prevItems.map((item) =>
            item._id === existItem._id
              ? { ...item, qty: Number(item.qty || 0) + qty }
              : item
          );
        } else {
          updatedCart = [...prevItems, { ...data, qty: qty }];
        }

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });
    };

    addToCart();
  }, [productId, qty]);

  // INCREASE QTY
  const increaseQtyHandler = (id) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id
        ? { ...item, qty: Number(item.qty || 0) + 1 }
        : item
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // DECREASE QTY
  const decreaseQtyHandler = (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item._id === id
          ? { ...item, qty: Number(item.qty || 0) - 1 }
          : item
      )
      .filter((item) => item.qty > 0);

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // REMOVE ITEM
  const removeItemHandler = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item._id !== id
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // TOTAL ITEMS (NaN-proof)
  const totalItems = cartItems.reduce(
    (acc, item) => acc + Number(item.qty || 0),
    0
  );

  // SUBTOTAL (NaN-proof)
  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc +
      Number(item.price || 0) *
        Number(item.qty || 0),
    0
  );

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id} className="cart-card">
              <div className="cart-item-left">
                <img
                  src={`http://localhost:5000${item.image}`}
                  alt={item.name}
                />
              </div>

              <div className="cart-item-right">
                <h3>{item.name}</h3>
                <p className="price">₹ {item.price}</p>

                <div className="qty-controls">
                  <button
                    onClick={() =>
                      decreaseQtyHandler(item._id)
                    }
                  >
                    -
                  </button>

                  <span>{item.qty}</span>

                  <button
                    onClick={() =>
                      increaseQtyHandler(item._id)
                    }
                  >
                    +
                  </button>
                </div>

                <p>
                  Total: ₹{" "}
                  {Number(item.price || 0) *
                    Number(item.qty || 0)}
                </p>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeItemHandler(item._id)
                  }
                >
                  Remove Item
                </button>
              </div>
            </div>
          ))}

          <div className="summary">
            <h3>Cart Summary</h3>
            <p>Total Items: {totalItems}</p>
            <p>Subtotal: ₹ {subtotal}</p>

            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartScreen;
