

import nodemailer, { Transporter } from "nodemailer";
import {
  EmailMessage,
  EmailProvider
} from "./email-provider.interface";

interface SMTPConfig {
  host: string;
  port: number;
}

export class SMTPEmailProvider implements EmailProvider {
  private transporter: Transporter;

  constructor(config: SMTPConfig) {
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: false
    });
  }

  async sendEmail(message: EmailMessage): Promise<void> {
    await this.transporter.sendMail({
      from: "Product Catalogue <no-reply@example.com>",
      to: message.to,
      subject: message.subject,
      text: message.text
    });
  }
}
