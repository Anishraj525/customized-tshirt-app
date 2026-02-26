import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function CheckoutScreen() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [address, setAddress] = useState("")

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))

    if (!user) {
      navigate("/")
    }
  }, [navigate])

  const handlePlaceOrder = () => {
    if (!name || !address) {
      alert("Please enter name and address")
      return
    }

    alert("Order Placed Successfully!")
    navigate("/order-success")
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Checkout</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8px", width: "250px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <textarea
          placeholder="Enter Full Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows="3"
          style={{ padding: "8px", width: "250px" }}
        />
      </div>

      <button onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  )
}

export default CheckoutScreen
