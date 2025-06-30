import z from "zod";

export const loginAdminSchema = z.object({
  userEmail: z.string().trim().email({ message: "Invalid email address" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const registerAdminSchema = loginAdminSchema.extend({
  userName: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" })
    .transform((value) => value.charAt(0).toUpperCase() + value.slice(1)),

  phoneNumber: z
    .string()
    .trim()
    .length(10, { message: "Enter a valid phone number" }),

  course: z
    .string()
    .trim()
    .min(3, { message: "Course must be at least 3 characters long" })
    .max(50, { message: "Course cannot exceed 50 characters" }),

  branch: z
    .string()
    .trim()
    .min(3, { message: "Branch must be at least 3 characters long" })
    .transform((value) => value.toUpperCase()),

  role: z
    .string()
    .trim()
    .refine((value) => ["Teacher", "Admin"].includes(value), {
      message: "Invalid Role",
    }),
});
