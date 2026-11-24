
import { useEffect, useState } from "react";
import { productService } from "../services/product.service";
import type { Product } from "../types/product.types";

interface UseProductsOptions {
  category?: string;
  search?: string;
  featured?: boolean;
}

export function useProducts(options: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const data = options.featured
          ? await productService.getFeaturedProducts(options.category)
          : await productService.getProducts({
              category: options.category,
              search: options.search
            });

        if (active) setProducts(data);
      } catch {
        if (active) setError("Unable to load products. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchProducts();

    return () => {
      active = false;
    };
  }, [options.category, options.search, options.featured]);

  return { products, loading, error };
}
