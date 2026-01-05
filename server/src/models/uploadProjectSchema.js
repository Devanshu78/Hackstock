import mongoose, { Schema } from "mongoose";

const componentSchema = new Schema({
  componentName: String,
  componentValue: String,
  componentImage: String,
  componentAvailability: String,
});

const imageSchema = new Schema({
  imageId: String,
  imageUrl: String,
});

const projectSchema = new Schema({
  projectName: { type: String, required: true, trim: true },
  projectDescription: { type: String, required: true, trim: true },
  projectComponents: [componentSchema],
  projectImage: [imageSchema],
  firePoint: { type: Number, required: true, default: 0 },
  isVerified: {
    type: String,
    default: "unverified",
    enum: ["unverified", "verified", "rejected"],
  },
  teacherId: { type: Schema.Types.ObjectId, ref: "Teacher" },
  userId: { type: Schema.Types.ObjectId, ref: "Students" },
});

export const StudentProject = mongoose.model("StudentProjects", projectSchema);
