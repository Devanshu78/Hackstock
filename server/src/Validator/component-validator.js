import { z } from "zod";

export const componentSchema = z.object({
  componentName: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name must not exceed 50 characters" })
    .transform((value) => value.charAt(0).toUpperCase() + value.slice(1)),

  componentAvailability: z.number().min(0),

  componentValue: z
    .number()
    .min(10, { message: "Value must be at least 10" })
    .max(200, { message: "Value must not exceed 200" }),
});
