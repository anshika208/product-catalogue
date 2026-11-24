
import { describe, it, expect, vi } from "vitest";
import { ProductService } from "../src/modules/products/product.service";
import { ProductRepository } from "../src/modules/products/product.repository";
import { ProductProvider } from "../src/providers/products/product-provider.interface";
import { Product } from "../src/modules/products/product.types";

const mockProducts: Product[] = [
  {
    id: 1,
    title: "Laptop",
    price: 1000,
    description: "Powerful laptop",
    category: "electronics",
    image: "laptop.jpg",
    rating: { rate: 4.5, count: 100 }
  },
  {
    id: 2,
    title: "Phone",
    price: 500,
    description: "Smart phone",
    category: "electronics",
    image: "phone.jpg",
    rating: { rate: 4.8, count: 200 }
  },
  {
    id: 3,
    title: "Bag",
    price: 50,
    description: "Travel bag",
    category: "fashion",
    image: "bag.jpg",
    rating: { rate: 4.2, count: 50 }
  }
];

function createService() {
  const provider: ProductProvider = {
    getAll: vi.fn().mockResolvedValue(mockProducts),
    getById: vi.fn().mockImplementation(async (id) =>
      mockProducts.find((product) => product.id === id) ?? null
    ),
    getCategories: vi.fn().mockResolvedValue([
      "electronics",
      "fashion"
    ])
  };

  const repository = new ProductRepository(provider);
  const service = new ProductService(repository);

  return { service, provider };
}

describe("ProductService", () => {
  it("should return products sorted by rating", async () => {
    const { service } = createService();

    const products = await service.getAllProducts();

    expect(products[0].title).toBe("Phone");
    expect(products[1].title).toBe("Laptop");
    expect(products[2].title).toBe("Bag");
  });

  it("should return only products matching search term", async () => {
    const { service } = createService();

    const products = await service.getAllProducts({
      search: "laptop"
    });

    expect(products).toHaveLength(1);
    expect(products[0].title).toBe("Laptop");
  });

  it("should filter products by category", async () => {
    const { service } = createService();

    const products = await service.getAllProducts({
      category: "electronics"
    });

    expect(products).toHaveLength(2);
  });

  it("should return maximum five featured products", async () => {
    const { service } = createService();

    const products = await service.getFeaturedProducts();

    expect(products.length).toBeLessThanOrEqual(5);
    expect(products[0].title).toBe("Phone");
  });

  it("should return product by ID", async () => {
    const { service } = createService();

    const product = await service.getProductById(1);

    expect(product?.title).toBe("Laptop");
  });

  it("should return null for unknown product", async () => {
    const { service } = createService();

    const product = await service.getProductById(999);

    expect(product).toBeNull();
  });
});
