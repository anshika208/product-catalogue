
import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import EnquiryForm from "../components/products/EnquiryForm";

export default function ProductDetailsPage() {
  const { id } = useParams();

  const { product, loading, error } = useProduct(
    id ? Number(id) : undefined
  );

  if (loading) return <Loader />;

  if (error || !product) {
    return <ErrorMessage message={error || "Product not found"} />;
  }

  return (
    <main className="page-container">
      <div className="product-details">
        <div className="details-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="details-info">
          <span>{product.category}</span>
          <h1>{product.title}</h1>

          <p>⭐ {product.rating.rate} / 5 ({product.rating.count} reviews)</p>

          <h2>${product.price.toFixed(2)}</h2>

          <p>{product.description}</p>

          <EnquiryForm productId={product.id} />
        </div>
      </div>
    </main>
  );
}
