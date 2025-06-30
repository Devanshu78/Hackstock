import mongoose, { mongo, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const studentSchema = new Schema(
  {
    avatar: {
      type: String,
      trime: true,
    },
    userEmail: {
      type: String,
      required: true,
      trim: true,
      uniqe: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    enrolmentNumber: {
      type: String,
      required: true,
      trim: true,
      uniqe: true,
      match: /^[0-9]{11}$/,
      message: "Enrollment ID must be exactly 11 digits long",
    },
    course: {
      type: String,
      required: true,
      trim: true,
    },
    branch: {
      type: String,
      required: true,
      trim: true,
    },
    semester: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    points: {
      type: Number,
      default: 0,
    },
    result: {
      type: Number,
      default: 0,
    },
    firePoints: {
      type: Number,
      default: 0,
    },
    verifiedProjects: {
      type: Number,
      default: 0,
    },
    nonVerifiedProjects: {
      type: Number,
      default: 0,
    },
    refreshToken: {
      type: String,
    },
    projects: [{ type: Schema.Types.ObjectId, ref: "StudentProjects" }],
  },
  {
    timestamps: true,
  }
);

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

studentSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

studentSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this.id.toString(),
      enrolmentNumber: this.enrolmentNumber.toString(),
      firePoints: this.firePoints.toString(),
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: `${eval(process.env.ACCESS_TOKEN_EXPIRY)}s`,
    }
  );
};
studentSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this.id.toString(),
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: `${eval(process.env.REFRESH_TOKEN_EXPIRY)}s`,
    }
  );
};

export const Student = mongoose.model("Students", studentSchema);
