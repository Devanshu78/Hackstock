import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const teacherSchema = new Schema(
  {
    userName: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    course: { type: String, required: true },
    branch: { type: String, required: true },
    role: {
      type: String,
      required: true,
      default: "Teacher",
      enum: ["Teacher", "Admin"],
    },
    projects: [{ type: Schema.Types.ObjectId, ref: "StudentProjects" }],
    refreshToken: { type: String },
  },
  { timestamps: true }
);

teacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

teacherSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

teacherSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this.id.toString(),
      role: this.role,
      name: this.name,
      email: this.email,
      phone: this.phone,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      // expiresIn: `10s`,
      expiresIn: `${eval(process.env.ACCESS_TOKEN_EXPIRY)}s`,
    }
  );
};
teacherSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this.id.toString(),
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: `${eval(process.env.REFRESH_TOKEN_EXPIRY)}s`,
      // expiresIn: `10m`,
    }
  );
};

export const Teacher = mongoose.model("Teacher", teacherSchema);
