import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderSuccessScreen.css";

function OrderSuccessScreen() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrder =
      JSON.parse(localStorage.getItem("order"));

    if (!savedOrder) {
      navigate("/");
    } else {
      setOrder(savedOrder);
    }
  }, [navigate]);

  if (!order) return null;

  return (
    <div className="order-success-container">
      <div className="order-box">
        <h2>🎉 Order Placed Successfully!</h2>

        <p><strong>Order ID:</strong> {order.orderId}</p>
        <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>

        <h3>Order Summary</h3>

        {order.items.map((item) => (
          <div key={item._id} className="order-item">
            <span>
              {item.name} x {item.qty}
            </span>
            <span>
              ₹ {item.price * item.qty}
            </span>
          </div>
        ))}

        <hr />

        <h3>Total: ₹ {order.total}</h3>

        <button onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default OrderSuccessScreen;
