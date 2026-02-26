import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OrderSuccessScreen() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  const user =
    JSON.parse(localStorage.getItem("user"));

  const orderKey = `order_${user.email}`;

  useEffect(() => {
    const savedOrder =
      JSON.parse(localStorage.getItem(orderKey));

    if (!savedOrder) {
      navigate("/", { replace: true });
    } else {
      setOrder(savedOrder);
    }
  }, []);

  if (!order) return null;

  return (
    <div style={{ padding: "20px" }}>
      <h2>🎉 Order Placed Successfully!</h2>

      <div style={{ marginTop: "15px", lineHeight: "1.8" }}>
         <p>Order ID: {order.orderId}</p>
          <p>Name: {order.name}</p>
          <p>Shipping Address: {order.shippingAddress}</p>
          <p style={{ fontWeight: "bold" }}>
              Total: ₹ {order.total}
          </p>
      </div>

      <button
        onClick={() =>
          navigate("/home", { replace: true })
        }
      >
        Back to Home
      </button>
    </div>
  );
}

export default OrderSuccessScreen;