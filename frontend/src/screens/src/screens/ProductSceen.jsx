import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductScreen = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <h3>₹ {product.price}</h3>
      <p>Stock: {product.countInStock}</p>
    </div>
  );
};

export default ProductScreen;
