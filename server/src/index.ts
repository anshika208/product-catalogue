import { buildApp } from "./app";
import { env } from "./config/env";
import { createProductModule } from "./modules/products/product.module";
import { createEnquiryModule } from "./modules/enquiries/enquiry.module";

async function startServer() {
  const {
    productService,
    productRepository
  } = createProductModule();

  const { enquiryService } = createEnquiryModule(
  productRepository,
  {
    smtpHost: env.SMTP_HOST,
    smtpPort: env.SMTP_PORT,
    salesEmail: env.SALES_EMAIL,
    useConsoleEmail: env.USE_CONSOLE_EMAIL
  }
);

  const app = await buildApp({
    clientUrl: env.CLIENT_URL,
    productService,
    enquiryService
  });

  try {
    await app.listen({
      port: env.PORT,
      host: "0.0.0.0"
    });

    app.log.info(`Server running on port ${env.PORT}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

startServer();
