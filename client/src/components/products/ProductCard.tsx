
import { Link } from "react-router-dom";
import type { Product } from "../../types/product.types";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="product-card"
    >
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>

      <div className="product-info">
        <span className="product-category">
          {product.category}
        </span>

        <h3>{product.title}</h3>

        <div className="product-rating">
          ⭐ {product.rating.rate} ({product.rating.count})
        </div>

        <strong>${product.price.toFixed(2)}</strong>
      </div>
    </Link>
  );
}
