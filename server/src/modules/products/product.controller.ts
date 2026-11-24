
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ProductService } from "./product.service";

const productQuerySchema = z.object({
  search: z.string().optional(),
  category: z.string().optional()
});

const productParamsSchema = z.object({
  id: z.coerce.number().int().positive()
});

export class ProductController {
  constructor(
    private readonly productService: ProductService
  ) {}

  getAllProducts = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const parsed = productQuerySchema.safeParse(request.query);

    if (!parsed.success) {
      return reply.status(400).send({
        success: false,
        message: "Invalid query parameters"
      });
    }

    const products = await this.productService.getAllProducts(
      parsed.data
    );

    return reply.send({
      success: true,
      data: products
    });
  };

  getFeaturedProducts = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const parsed = productQuerySchema.safeParse(request.query);

    if (!parsed.success) {
      return reply.status(400).send({
        success: false,
        message: "Invalid query parameters"
      });
    }

    const products = await this.productService.getFeaturedProducts(
      parsed.data.category
    );

    return reply.send({
      success: true,
      data: products
    });
  };

  getProductById = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const parsed = productParamsSchema.safeParse(request.params);

    if (!parsed.success) {
      return reply.status(400).send({
        success: false,
        message: "Invalid product ID"
      });
    }

    const product = await this.productService.getProductById(
      parsed.data.id
    );

    if (!product) {
      return reply.status(404).send({
        success: false,
        message: "Product not found"
      });
    }

    return reply.send({
      success: true,
      data: product
    });
  };

  getCategories = async (
    _request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const categories = await this.productService.getCategories();

    return reply.send({
      success: true,
      data: categories
    });
  };
}
