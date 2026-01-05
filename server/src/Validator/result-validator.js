import z from "zod";

export const checkResult = z.object({
  enrolmentNumber: z
    .string()
    .trim()
    .min(11, { message: "Enrolment ID must be 11 digits long" })
    .max(12, { message: "Enrolment ID cannot exceed 12 digits" }),
  result: z
    .number()
    .min(0, { message: "Enter correct SCGPA" })
    .max(10, { message: "Enter correct SCGPA" }),
  semester: z.number().min(1).max(8),
});
