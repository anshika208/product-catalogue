
import { FastifyReply, FastifyRequest } from "fastify";
import { EnquiryService } from "./enquiry.service";
import { enquirySchema } from "./enquiry.schema";

export class EnquiryController {
  constructor(
    private readonly enquiryService: EnquiryService
  ) {}

  submitEnquiry = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const parsed = enquirySchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.status(400).send({
        success: false,
        message: "Invalid enquiry details",
        errors: parsed.error.flatten().fieldErrors
      });
    }

    await this.enquiryService.submitEnquiry(parsed.data);

    return reply.status(201).send({
      success: true,
      message: "Thank you! Your enquiry has been submitted successfully."
    });
  };
}
