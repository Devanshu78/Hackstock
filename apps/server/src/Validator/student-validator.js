import z from "zod";

export const loginUserSchema = z.object({
  userEmail: z.string().trim().email({ message: "Invalid email address" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const registerUserSchema = loginUserSchema.extend({
  userName: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" })
    .transform((value) => value.charAt(0).toUpperCase() + value.slice(1)),

  enrolmentNumber: z
    .string()
    .trim()
    .length(11, { message: "Enrolment ID must be 11 or 12 digits long" })
    .or(
      z
        .string()
        .trim()
        .length(12, { message: "Enrolment ID must be 11 or 12 digits long" })
    ),

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

  semester: z
    .string()
    .trim()
    .refine(
      (value) => ["1", "2", "3", "4", "5", "6", "7", "8"].includes(value),
      {
        message: "Invalid semester",
      }
    ),
});
