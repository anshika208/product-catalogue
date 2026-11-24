
import { ProductRepository } from "./product.repository";
import { Product, ProductFilters } from "./product.types";

export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository
  ) {}

  async getAllProducts(filters: ProductFilters = {}): Promise<Product[]> {
    let products = await this.productRepository.findAll();

    if (filters.category) {
      products = products.filter(
        (product) => product.category === filters.category
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.trim().toLowerCase();

      products = products.filter((product) =>
        [
          product.title,
          product.description,
          product.category
        ].some((value) => value.toLowerCase().includes(searchTerm))
      );
    }

    return products.sort(
      (a, b) =>
        b.rating.rate - a.rating.rate ||
        b.rating.count - a.rating.count
    );
  }

  async getFeaturedProducts(category?: string): Promise<Product[]> {
    const products = await this.getAllProducts({ category });

    return products.slice(0, 5);
  }

  async getProductById(id: number): Promise<Product | null> {
    return this.productRepository.findById(id);
  }

  async getCategories(): Promise<string[]> {
    return this.productRepository.findCategories();
  }
}
