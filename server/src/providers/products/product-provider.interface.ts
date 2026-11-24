
import { Product } from "../../modules/products/product.types";

export interface ProductProvider {
  getAll(): Promise<Product[]>;

  getById(id: number): Promise<Product | null>;

  getCategories(): Promise<string[]>;
}
