
import { useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductGrid from "../components/products/ProductGrid";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

export default function CategoryPage() {
  const { category } = useParams();

  const decodedCategory = category
    ? decodeURIComponent(category)
    : "";

  const { products, loading, error } = useProducts({
    category: decodedCategory
  });

  const { products: featured } = useProducts({
    category: decodedCategory,
    featured: true
  });

  if (loading) return <Loader />;

  if (error) return <ErrorMessage message={error} />;

  return (
    <main className="page-container">
      <section className="products-section">
        <span>EXPLORE CATEGORY</span>
        <h1 className="page-title">{decodedCategory}</h1>

        <h2>Top Rated</h2>
        <ProductGrid products={featured} />

        <h2 className="additional-heading">All Products</h2>
        <ProductGrid products={products} />
      </section>
    </main>
  );
}
