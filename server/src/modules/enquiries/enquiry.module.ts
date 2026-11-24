
import { SMTPEmailProvider } from "../../providers/email/smtp.provider";
import { ConsoleEmailProvider } from "../../providers/email/console.provider";
import { ProductRepository } from "../products/product.repository";
import { EnquiryService } from "./enquiry.service";

interface EnquiryModuleConfig {
  smtpHost: string;
  smtpPort: number;
  salesEmail: string;
  useConsoleEmail: boolean;
}

export function createEnquiryModule(
  productRepository: ProductRepository,
  config: EnquiryModuleConfig
) {
  const emailProvider = config.useConsoleEmail
    ? new ConsoleEmailProvider()
    : new SMTPEmailProvider({
        host: config.smtpHost,
        port: config.smtpPort
      });

  const enquiryService = new EnquiryService(
    productRepository,
    emailProvider,
    {
      salesEmail: config.salesEmail
    }
  );

  return { enquiryService };
}
