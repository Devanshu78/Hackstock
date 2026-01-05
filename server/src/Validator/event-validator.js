import { z } from "zod";

// Regex to validate 24-hour format time (HH:mm)
const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;

const eventValidator = z
  .object({
    eventDate: z.string().refine((val) => !isNaN(new Date(val).getTime()), {
      message: "Invalid event date",
    }),
    startTime: z
      .string()
      .regex(timeRegex, { message: "Start time must be in HH:mm format" }),

    endTime: z
      .string()
      .regex(timeRegex, { message: "End time must be in HH:mm format" }),
  })
  .refine(
    (data) => {
      const start = new Date(`${data.eventDate}T${data.startTime}:00`);
      const end = new Date(`${data.eventDate}T${data.endTime}:00`);
      return end > start;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  );

export default eventValidator;
