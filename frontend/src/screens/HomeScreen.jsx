import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <Link to={`/product/${product._id}`}>
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p>₹ {product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;