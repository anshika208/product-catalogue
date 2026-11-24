
import { Product } from "./product.types";
import { ProductProvider } from "../../providers/products/product-provider.interface";

export class ProductRepository {
  constructor(
    private readonly productProvider: ProductProvider
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productProvider.getAll();
  }

  async findById(id: number): Promise<Product | null> {
    return this.productProvider.getById(id);
  }

  async findCategories(): Promise<string[]> {
    return this.productProvider.getCategories();
  }
}
