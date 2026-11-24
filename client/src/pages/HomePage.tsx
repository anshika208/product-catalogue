
import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductGrid from "../components/products/ProductGrid";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

export default function HomePage() {
  const { products, loading, error } = useProducts({
    featured: true
  });

  if (loading) return <Loader />;

  if (error) return <ErrorMessage message={error} />;

  return (
    <main className="page-container">
      <section className="hero">
        <div>
          <span>DISCOVER YOUR NEXT FAVOURITE</span>
          <h1>Find products you'll love.</h1>
          <p>
            Explore our curated collection of products
            across multiple categories.
          </p>
          <Link to="/search?q=" className="hero-link">
            Explore Collection
          </Link>
        </div>
      </section>

      <section className="products-section">
        <div className="section-heading">
          <div>
            <span>HANDPICKED FOR YOU</span>
            <h2>Top Rated Products</h2>
          </div>
        </div>

        <ProductGrid products={products} />
      </section>
    </main>
  );
}
