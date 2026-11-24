
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductGrid from "../components/products/ProductGrid";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";

  const { products, loading, error } = useProducts({
    search: query
  });

  if (loading) return <Loader />;

  if (error) return <ErrorMessage message={error} />;

  return (
    <main className="page-container products-section">
      <span>SEARCH RESULTS</span>
      <h1>Results for "{query}"</h1>
      <p>{products.length} products found</p>

      <ProductGrid products={products} />
    </main>
  );
}
