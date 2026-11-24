
import { ProductRepository } from "../products/product.repository";
import { EmailProvider } from "../../providers/email/email-provider.interface";
import { EnquiryInput } from "./enquiry.schema";

interface EnquiryServiceConfig {
  salesEmail: string;
}

export class EnquiryService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly emailProvider: EmailProvider,
    private readonly config: EnquiryServiceConfig
  ) {}

  async submitEnquiry(input: EnquiryInput): Promise<void> {
    // Fetch product details from our trusted data source.
    const product = await this.productRepository.findById(
      input.productId
    );

    if (!product) {
      const error = new Error("Product not found");
      Object.assign(error, { statusCode: 404 });
      throw error;
    }

    // Prepare email content.
    const message = `
New Product Enquiry

Product: ${product.title}
Product ID: ${product.id}

Customer Details:
Name: ${input.name}
Email: ${input.email}
Phone: ${input.phone || "Not provided"}

Message:
${input.message}
    `;

    // Send enquiry to the sales inbox.
    await this.emailProvider.sendEmail({
      to: this.config.salesEmail,
      subject: `New Enquiry: ${product.title}`,
      text: message
    });
  }
}
