import mongoose, { Schema } from "mongoose";

const resultSchema = new Schema(
  {
    enrolmentNumber: {
      type: String,
      required: true,
      trim: true,
    },
    result: {
      type: Number,
      required: true,
      default: 0,
    },
    semester: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 8],
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export const Result = mongoose.model("Result", resultSchema);
