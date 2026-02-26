import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"

function ProductScreen() {
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  // Image customization
  const [customImage, setCustomImage] = useState(null)
  const [imagePosition, setImagePosition] = useState({ x: 75, y: 70 })
  const [imageSize, setImageSize] = useState(100)

  // Text customization
  const [customText, setCustomText] = useState("")
  const [textPosition, setTextPosition] = useState({ x: 80, y: 200 })
  const [textSize, setTextSize] = useState(24)
  const [textColor, setTextColor] = useState("#000000")

  const dragging = useRef(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products")
        const data = await res.json()
        const foundProduct = data.find(
          (item) => item._id === id
        )
        setProduct(foundProduct)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [id])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setCustomImage(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleMouseDown = (type) => {
    dragging.current = type
  }

  const handleMouseUp = () => {
    dragging.current = null
  }

  const handleMouseMove = (e) => {
    if (!dragging.current) return

    const rect = e.currentTarget.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (dragging.current === "image") {
      setImagePosition({
        x: x - imageSize / 2,
        y: y - imageSize / 2,
      })
    }

    if (dragging.current === "text") {
      setTextPosition({
        x: x,
        y: y,
      })
    }
  }

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || []

    const customData = {
      customImage,
      imagePosition,
      imageSize,
      customText,
      textPosition,
      textSize,
      textColor,
    }

    const existingItem = cart.find(
      (item) => item._id === product._id
    )

    let updatedCart

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item._id === product._id
          ? {
              ...item,
              qty: Number(item.qty || 0) + 1,
              ...customData,
            }
          : item
      )
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          qty: 1,
          ...customData,
        },
      ]
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart))
    alert("Custom T-Shirt added to cart 🛒🔥")
  }

  if (loading) return <h2>Loading...</h2>
  if (!product) return <h2>Product not found</h2>

  return (
    <div style={{ padding: "20px" }}>
      <h2>{product.name}</h2>

      {/* Shirt Canvas */}
      <div
        style={{
          position: "relative",
          width: "250px",
          height: "300px",
          marginBottom: "20px",
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <img
          src={`http://localhost:5000${product.image}`}
          alt={product.name}
          style={{ width: "250px" }}
        />

        {customImage && (
          <img
            src={customImage}
            alt="Custom"
            onMouseDown={() => handleMouseDown("image")}
            style={{
              position: "absolute",
              top: imagePosition.y,
              left: imagePosition.x,
              width: imageSize,
              height: imageSize,
              objectFit: "contain",
              cursor: "move",
            }}
          />
        )}

        {customText && (
          <div
            onMouseDown={() => handleMouseDown("text")}
            style={{
              position: "absolute",
              top: textPosition.y,
              left: textPosition.x,
              fontSize: textSize,
              color: textColor,
              cursor: "move",
              fontWeight: "bold",
            }}
          >
            {customText}
          </div>
        )}
      </div>

      <h3>₹ {product.price}</h3>

      {/* Image Upload */}
      <div>
        <input type="file" onChange={handleImageUpload} />
      </div>

      {customImage && (
        <div>
          <label>Resize Image: </label>
          <input
            type="range"
            min="50"
            max="200"
            value={imageSize}
            onChange={(e) =>
              setImageSize(Number(e.target.value))
            }
          />
        </div>
      )}

      {/* Text Customization */}
      <div style={{ marginTop: "15px" }}>
        <input
          type="text"
          placeholder="Enter custom text"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
        />
      </div>

      {customText && (
        <>
          <div>
            <label>Text Size: </label>
            <input
              type="range"
              min="16"
              max="60"
              value={textSize}
              onChange={(e) =>
                setTextSize(Number(e.target.value))
              }
            />
          </div>

          <div>
            <label>Text Color: </label>
            <input
              type="color"
              value={textColor}
              onChange={(e) =>
                setTextColor(e.target.value)
              }
            />
          </div>
        </>
      )}

      <button
        onClick={handleAddToCart}
        style={{
          padding: "10px 20px",
          marginTop: "15px",
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductScreen
