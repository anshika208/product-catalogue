
import { describe, it, expect, vi } from "vitest";
import { EnquiryService } from "../src/modules/enquiries/enquiry.service";
import { ProductRepository } from "../src/modules/products/product.repository";
import { ProductProvider } from "../src/providers/products/product-provider.interface";
import { EmailProvider } from "../src/providers/email/email-provider.interface";
import { Product } from "../src/modules/products/product.types";

const product: Product = {
  id: 1,
  title: "Laptop",
  price: 1000,
  description: "Powerful laptop",
  category: "electronics",
  image: "laptop.jpg",
  rating: { rate: 4.5, count: 100 }
};

function createService() {
  const productProvider: ProductProvider = {
    getAll: vi.fn().mockResolvedValue([product]),
    getById: vi.fn().mockImplementation(async (id) =>
      id === 1 ? product : null
    ),
    getCategories: vi.fn().mockResolvedValue(["electronics"])
  };

  const emailProvider: EmailProvider = {
    sendEmail: vi.fn().mockResolvedValue(undefined)
  };

  const repository = new ProductRepository(productProvider);

  const service = new EnquiryService(
    repository,
    emailProvider,
    { salesEmail: "sales@example.com" }
  );

  return { service, emailProvider };
}

const validEnquiry = {
  productId: 1,
  name: "Test Customer",
  email: "customer@example.com",
  phone: "9876543210",
  message: "I am interested in this product."
};

describe("EnquiryService", () => {
  it("should submit enquiry and send email", async () => {
    const { service, emailProvider } = createService();

    await service.submitEnquiry(validEnquiry);

    expect(emailProvider.sendEmail).toHaveBeenCalledTimes(1);

    expect(emailProvider.sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "sales@example.com",
        subject: "New Enquiry: Laptop"
      })
    );
  });

  it("should not send email for an invalid product", async () => {
    const { service, emailProvider } = createService();

    await expect(
      service.submitEnquiry({
        ...validEnquiry,
        productId: 999
      })
    ).rejects.toThrow("Product not found");

    expect(emailProvider.sendEmail).not.toHaveBeenCalled();
  });

  it("should propagate email provider failures", async () => {
    const { service, emailProvider } = createService();

    vi.mocked(emailProvider.sendEmail).mockRejectedValue(
      new Error("SMTP connection failed")
    );

    await expect(
      service.submitEnquiry(validEnquiry)
    ).rejects.toThrow("SMTP connection failed");
  });
});
