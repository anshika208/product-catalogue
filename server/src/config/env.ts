
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();


const envSchema = z.object({
  PORT: z.coerce.number().default(3000),

  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  CLIENT_URL: z.string().url().default("http://localhost:5173"),

  SALES_EMAIL: z.string().email().default("sales@example.com"),

  SMTP_HOST: z.string().default("localhost"),

  SMTP_PORT: z.coerce.number().default(1025),

  USE_CONSOLE_EMAIL: z
  .enum(["true", "false"])
  .default("false")
  .transform((value) => value === "true"),
});

export const env = envSchema.parse(process.env);
