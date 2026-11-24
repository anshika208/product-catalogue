
import { FakeStoreProductProvider } from "../../providers/products/fake-store.provider";
import { ProductRepository } from "./product.repository";
import { ProductService } from "./product.service";

export function createProductModule() {
  const productProvider = new FakeStoreProductProvider();

  const productRepository = new ProductRepository(
    productProvider
  );

  const productService = new ProductService(
    productRepository
  );

  return {
    productService,
    productRepository
  };
}
