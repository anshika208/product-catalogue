
import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";

export default function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { categories } = useCategories();

  function handleSearch(event: FormEvent) {
    event.preventDefault();

    const query = search.trim();

    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  }

  return (
    <header className="site-header">
      <div className="header-main">
        <Link to="/" className="brand">
          CATALOG<span>.</span>
        </Link>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <nav className="category-nav">
        <Link to="/">All Products</Link>

        {categories.map((category) => (
          <Link
            key={category}
            to={`/category/${encodeURIComponent(category)}`}
          >
            {category}
          </Link>
        ))}
      </nav>
    </header>
  );
}
