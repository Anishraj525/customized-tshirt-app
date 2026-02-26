import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [customText, setCustomText] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  // Position controls
  const [imgX, setImgX] = useState(100);
  const [imgY, setImgY] = useState(100);
  const [textX, setTextX] = useState(120);
  const [textY, setTextY] = useState(350);

  // Text customization
  const [textColor, setTextColor] = useState("#000000");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [textSize, setTextSize] = useState(20);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const addToCart = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("Please login first!");
      navigate("/");
      return;
    }

    const cartKey = `cart_${storedUser.email}`;

    const cartItem = {
      ...product,
      customText,
      customImage: previewImage,
      imgX,
      imgY,
      textX,
      textY,
      textColor,
      fontFamily,
      textSize,
      qty: 1,
    };

    const existingCart =
      JSON.parse(localStorage.getItem(cartKey)) || [];

    const updatedCart = [...existingCart, cartItem];

    localStorage.setItem(cartKey, JSON.stringify(updatedCart));

    navigate("/cart");
  };

  if (!product) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{product.name}</h2>
      <h3>₹ {product.price}</h3>

      <hr />

      <h3>Customize Your T-Shirt</h3>

      {/* TEXT INPUT */}
      <input
        type="text"
        placeholder="Enter custom text"
        value={customText}
        onChange={(e) => setCustomText(e.target.value)}
      />

      <br /><br />

      {/* TEXT COLOR */}
      <label>Text Color: </label>
      <input
        type="color"
        value={textColor}
        onChange={(e) => setTextColor(e.target.value)}
      />

      <br /><br />

      {/* FONT SELECTOR */}
      <label>Font Style: </label>
      <select
        value={fontFamily}
        onChange={(e) => setFontFamily(e.target.value)}
      >
        <option value="Arial">Arial</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Impact">Impact</option>
        <option value="Times New Roman">Times New Roman</option>
      </select>

      <br /><br />

      {/* TEXT SIZE */}
      <label>Text Size</label>
      <input
        type="range"
        min="10"
        max="60"
        value={textSize}
        onChange={(e) => setTextSize(Number(e.target.value))}
        style={{ width: "300px" }}
      />

      <br /><br />

      {/* IMAGE UPLOAD */}
      <input type="file" onChange={handleImageUpload} />

      <br /><br />

      {/* IMAGE POSITION */}
      <h4>Move Image</h4>
      
      <input
        type="range"
        min="0"
        max="300"
        value={imgX}
        onChange={(e) => setImgX(Number(e.target.value))}
        style={{ width: "300px" }}
      />
      
      <input
        type="range"
        min="0"
        max="400"
        value={imgY}
        onChange={(e) => setImgY(Number(e.target.value))}
        style={{ width: "300px" }}
      />

      <br /><br />

      {/* TEXT POSITION */}
      <h4>Move Text</h4>
      
      <input
        type="range"
        min="0"
        max="300"
        value={textX}
        onChange={(e) => setTextX(Number(e.target.value))}
        style={{ width: "300px" }}
      />
      
      <input
        type="range"
        min="0"
        max="400"
        value={textY}
        onChange={(e) => setTextY(Number(e.target.value))}
        style={{ width: "300px" }}
      />

      <br /><br />

      {/* PREVIEW */}
      <div
        style={{
          position: "relative",
          width: "400px",
          height: "500px",
          border: "1px solid #ccc",
          backgroundColor: "#f8f8f8",
        }}
      >
        <img
          src={`http://localhost:5000${product.image}`}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />

        {previewImage && (
          <img
            src={previewImage}
            alt="Custom"
            style={{
              position: "absolute",
              top: `${imgY}px`,
              left: `${imgX}px`,
              width: "150px",   // Fixed size now
            }}
          />
        )}

        {customText && (
          <div
            style={{
              position: "absolute",
              top: `${textY}px`,
              left: `${textX}px`,
              fontSize: `${textSize}px`,
              color: textColor,
              fontFamily: fontFamily,
              fontWeight: "bold",
            }}
          >
            {customText}
          </div>
        )}
      </div>

      <br />

      <button onClick={addToCart}>Add To Cart</button>
    </div>
  );
};

export default ProductScreen;