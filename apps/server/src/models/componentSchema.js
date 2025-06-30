import mongoose, { Schema } from "mongoose";

const componentSchema = new Schema({
  componentName: { type: String, required: true, trim: true, unique: true },
  componentImage: { type: String, required: true, trim: true },
  imageId: { type: String, required: true, trim: true },
  componentAvailability: { type: Number, required: true },
  componentValue: { type: Number, required: true },
});

export const Component = mongoose.model("Components", componentSchema);
