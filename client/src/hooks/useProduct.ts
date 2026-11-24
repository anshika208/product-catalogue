
import { useEffect, useState } from "react";
import { productService } from "../services/product.service";
import type { Product } from "../types/product.types";

export function useProduct(id: number | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchProduct() {
      if (!id) {
        setProduct(null);
        setError("Invalid product ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await productService.getProductById(id);

        if (active) setProduct(data);
      } catch {
        if (active) setError("Unable to load product details.");
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchProduct();

    return () => {
      active = false;
    };
  }, [id]);

  return { product, loading, error };
}
