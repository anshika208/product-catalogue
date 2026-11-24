
import api from "./api";
import type { ApiResponse, EnquiryPayload } from "../types/product.types";

export const enquiryService = {
  async submitEnquiry(payload: EnquiryPayload): Promise<string> {
    const response = await api.post<ApiResponse<null>>(
      "/enquiries",
      payload
    );

    return response.data.message || "Thank you! Your enquiry has been submitted.";
  }
};
