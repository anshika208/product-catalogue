
import {
  EmailMessage,
  EmailProvider
} from "./email-provider.interface";

export class ConsoleEmailProvider implements EmailProvider {
  async sendEmail(message: EmailMessage): Promise<void> {
    console.log("\n========== NEW EMAIL ==========");
    console.log("To:", message.to);
    console.log("Subject:", message.subject);
    console.log("Message:", message.text);
    console.log("================================\n");
  }
}

