
import { FastifyPluginAsync } from "fastify";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";

interface ProductRoutesOptions {
  productService: ProductService;
}

const productRoutes: FastifyPluginAsync<ProductRoutesOptions> =
  async (app, options) => {

    const controller = new ProductController(
      options.productService
    );

    app.get("/featured", controller.getFeaturedProducts);

    app.get("/categories", controller.getCategories);

    app.get("/", controller.getAllProducts);

    app.get("/:id", controller.getProductById);
  };

export default productRoutes;
