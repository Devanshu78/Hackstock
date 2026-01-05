import mongoose, { Schema } from "mongoose";

const winnerSchema = new mongoose.Schema({
  componentName: { type: String, required: true, trim: true },
  personId: { type: String, required: true, trim: true },
  semester: { type: Number, required: true },
  biddingAmount: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    default: "Pending",
    enum: ["Pending", "Approved", "Rejected"],
  },
  date: { type: Date, required: true },
});

export const Winner = mongoose.model("Winner", winnerSchema);
