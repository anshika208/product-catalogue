
import { Product } from "../../modules/products/product.types";
import { ProductProvider } from "./product-provider.interface";

export class FakeStoreProductProvider implements ProductProvider {
  private readonly baseUrl = "https://fakestoreapi.com";

  async getAll(): Promise<Product[]> {
    const response = await fetch(`${this.baseUrl}/products`);

    if (!response.ok) {
      throw new Error("Failed to fetch products from Fake Store API");
    }

    return response.json() as Promise<Product[]>;
  }

  async getById(id: number): Promise<Product | null> {
    const response = await fetch(`${this.baseUrl}/products/${id}`);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }

    return response.json() as Promise<Product>;
  }

  async getCategories(): Promise<string[]> {
    const response = await fetch(
      `${this.baseUrl}/products/categories`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch product categories");
    }

    return response.json() as Promise<string[]>;
  }
}
