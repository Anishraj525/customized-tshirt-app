import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function HomeScreen() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  // 🔐 Protect route
  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      navigate("/")
    }
  }, [navigate])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/products"
        )
        const data = await res.json()
        setProducts(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>

      {products.map((product) => (
        <div
          key={product._id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px",
            cursor: "pointer",
          }}
          onClick={() =>
            navigate(`/product/${product._id}`)
          }
        >
          <h3>{product.name}</h3>
          <p>₹ {product.price}</p>
        </div>
      ))}
    </div>
  )
}

export default HomeScreen
