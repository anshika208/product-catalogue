
import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import productRoutes from "./modules/products/product.route";
import { ProductService } from "./modules/products/product.service";
import enquiryRoutes from "./modules/enquiries/enquiry.routes";
import { EnquiryService } from "./modules/enquiries/enquiry.service";

interface AppOptions {
  clientUrl: string;
  productService: ProductService;
  enquiryService: EnquiryService;
}

export async function buildApp(
  options: AppOptions
): Promise<FastifyInstance> {

  const app = Fastify({
    logger: true
  });

  // Configure CORS so the frontend can communicate
  // with our backend.
  await app.register(cors, {
    origin: options.clientUrl,
    methods: ["GET", "POST", "PUT", "DELETE"]
  });

  await app.register(productRoutes, {
  prefix: "/api/products",
  productService: options.productService
});

await app.register(enquiryRoutes, {
  prefix: "/api/enquiries",
  enquiryService: options.enquiryService
});

  // Health check endpoint
  app.get("/api/health", async () => {
    return {
      success: true,
      message: "Product Catalogue API is running"
    };
  });

  // Handle unknown routes
  app.setNotFoundHandler((request, reply) => {
    return reply.status(404).send({
      success: false,
      message: `Route ${request.method} ${request.url} not found`
    });
  });

  // Centralized error handling
  app.setErrorHandler((error, request, reply) => {
    request.log.error(error);

    const statusCode =
      typeof error === "object" &&
      error !== null &&
      "statusCode" in error &&
      typeof error.statusCode === "number"
        ? error.statusCode
        : 500;

    return reply.status(statusCode).send({
      success: false,
      message:
        statusCode < 500 && error instanceof Error
          ? error.message
          : "Internal Server Error"
    });
  });

  return app;
}
