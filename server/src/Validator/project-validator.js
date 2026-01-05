import z from "zod";

export const projectSchema = z.object({
  projectName: z
    .string()
    .trim()
    .min(3, { message: "Project name must be at least 3 characters long" })
    .max(50, { message: "Project name cannot excees 50 characters" })
    .transform((value) => value.charAt(0).toUpperCase() + value.slice(1)),
  projectDescription: z
    .string()
    .trim()
    .min(3, { message: "Description must be at least 3 characters long" })
    .max(1000, { message: "Description cannot exceed 1000 characters" }),
  teacherId: z
    .string()
    .trim()
    .min(3, { message: "Teacher ID must be at least 3 characters long" })
    .max(50, { message: "Teacher ID cannot exceed 50 characters" })
    .transform((value) => value.charAt(0).toUpperCase() + value.slice(1)),
  projectComponents: z
    .array(
      z.object({
        componentName: z.string(),
        componentValue: z
          .union([z.string(), z.number()])
          .transform((value) => Number(value))
          .refine((value) => value >= 10, {
            message: "Value must be at least 10",
          }),

        componentImage: z.string(),
        componentAvailability: z
          .union([z.string(), z.number()])
          .transform((value) => Number(value))
          .refine((value) => value >= 0, {
            message: "Availability must be at least 0",
          }),
      })
    )
    .min(1, { message: "At least one project component is required" }),
});

export const imageFileSchema = z.object({
  file: z
    .instanceof(Object)
    .refine((file) => file.mimetype.startsWith("image/"), {
      message: "Each file must be an image file",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      // Max 5MB
      message: "Each file must be 5MB or smaller",
    }),
});
