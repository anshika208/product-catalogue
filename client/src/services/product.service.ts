
import api from "./api";
import type { ApiResponse, Product } from "../types/product.types";

export const productService = {
  async getFeaturedProducts(category?: string): Promise<Product[]> {
    const response = await api.get<ApiResponse<Product[]>>(
      "/products/featured",
      { params: category ? { category } : {} }
    );

    return response.data.data;
  },

  async getProducts(filters?: {
    search?: string;
    category?: string;
  }): Promise<Product[]> {
    const response = await api.get<ApiResponse<Product[]>>(
      "/products",
      { params: filters }
    );

    return response.data.data;
  },

  async getProductById(id: number): Promise<Product> {
    const response = await api.get<ApiResponse<Product>>(
      `/products/${id}`
    );

    return response.data.data;
  },

  async getCategories(): Promise<string[]> {
    const response = await api.get<ApiResponse<string[]>>(
      "/products/categories"
    );

    return response.data.data;
  }
};
