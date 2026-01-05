import mongoose, { Schema } from "mongoose";

const aggreSchema = new Schema(
  {
    maxResult: { type: Number, required: true, default: 0 },
    minResult: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Aggregate = mongoose.model("Aggregate", aggreSchema);
