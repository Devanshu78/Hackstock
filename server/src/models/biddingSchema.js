import mongoose, { Schema } from "mongoose";

const biddingSchema = new Schema(
  {
    biddingAmount: { type: Number, required: true },
    componentName: { type: String, required: true },
    personId: { type: String, required: true },
    semester: { type: Number, required: true },
    points: { type: Number, required: true },
    bidTime: { type: Date, required: true },
    processed: { type: Boolean, default: false },
  },
  { timestamp: true }
);

export const Bidding = mongoose.model("Bidding", biddingSchema);
