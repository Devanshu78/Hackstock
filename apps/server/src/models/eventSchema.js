import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    eventDate: { type: Date, required: true, unique: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
