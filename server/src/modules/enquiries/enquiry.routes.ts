
import { FastifyPluginAsync } from "fastify";
import { EnquiryController } from "./enquiry.controller";
import { EnquiryService } from "./enquiry.service";

interface EnquiryRoutesOptions {
  enquiryService: EnquiryService;
}

const enquiryRoutes: FastifyPluginAsync<EnquiryRoutesOptions> =
  async (app, options) => {

    const controller = new EnquiryController(
      options.enquiryService
    );

    app.post("/", controller.submitEnquiry);
  };

export default enquiryRoutes;
