import { Teacher } from "../../models/teacherSchema.js";
import { StudentProject } from "../../models/uploadProjectSchema.js";
import jwt from "jsonwebtoken";
import {
  loginAdminSchema,
  registerAdminSchema,
} from "../../Validator/admin-validator.js";

const generateTokens = async (id) => {
  try {
    const user = await Teacher.findById({ _id: id });
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error.message);
    return;
  }
};

export const registerTeacher = async (req, res) => {
  try {
    const { data, error } = registerAdminSchema.safeParse(req.body);
    if (error) {
      console.log(error.errors[0].message);
      return res.status(400).json({ message: error.errors[0].message });
    }
    const {
      userEmail,
      userName,
      phoneNumber,
      course,
      branch,
      semester,
      password,
    } = data;
    const existedUser = await Teacher.findOne({ userEmail });
    if (existedUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const user = await Teacher.create({
      userEmail,
      userName,
      phoneNumber,
      course,
      branch,
      semester,
      password,
    });

    const createdUser = await Teacher.findById(user._id).select("-password");
    if (!createdUser) {
      return res
        .status(500)
        .json({ message: "Something went wrong while registering" });
    }

    return res.status(201).json({
      data: createdUser,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const loginTeacher = async (req, res) => {
  try {
    const { data, error } = loginAdminSchema.safeParse(req.body);
    if (error) {
      return res.status(400).json({ message: error.errors[0].message });
    }

    const { userEmail, password } = data;
    const user = await Teacher.findOne({ userEmail });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const tokens = await generateTokens(user._id);
    const accessToken = tokens.accessToken;
    const refreshToken = tokens.refreshToken;

    const accessOption = {
      httpOnly: true,
      secure: false,
      samSite: "lax",
      // maxAge: 10 * 1000,
      maxAge: eval(process.env.ACCESS_TOKEN_EXPIRY) * 1000,
    };
    const refreshOption = {
      httpOnly: true,
      secure: false,
      samSite: "lax",
      // maxAge: 10 * 60 * 1000,
      maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
    };

    return res
      .status(200)
      .cookie("accessTokenOfAdminPortal", accessToken, accessOption)
      .cookie("refreshTokenOfAdminPortal", refreshToken, refreshOption)
      .json({
        data: user,
        accessToken,
        refreshToken,
        message: "Logged in successfully",
      });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const isVerifiedTeacher = async (req, res) => {
  return res.status(200).json({
    loggedIn: true,
  });
};

export const logoutTeacher = async (req, res) => {
  try {
    const user = req.user;
    const update = await Teacher.updateOne(
      { _id: user._id },
      { $set: { refreshToken: null } }
    );
    if (!update) {
      return res.status(500).json({ message: "Something went wrong" });
    }
    const option = {
      httpOnly: true,
      secure: false,
    };
    return res
      .status(200)
      .clearCookie("accessTokenOfAdminPortal", option)
      .clearCookie("refreshTokenOfAdminPortal", option)
      .json({ message: "Logout Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const generateAccessToken = async (req, res) => {
  try {
    const token = req.cookies?.refreshTokenOfAdminPortal;
    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }
    const isVerified = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await Teacher.findById(isVerified?._id).select("-password");
    if (!user) {
      res.status(401).json({ msg: "User validation failed" });
    }
    const accessToken = await user.generateAccessToken();
    const accessOption = {
      httpOnly: true,
      secure: false,
      // maxAge: 10 * 1000,
      maxAge: eval(process.env.ACCESS_TOKEN_EXPIRY) * 1000,
    };
    return res
      .status(200)
      .cookie("accessTokenOfAdminPortal", accessToken, accessOption)
      .json({ accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getUserData = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await Teacher.findById(_id).populate("projects");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Unable to fetch your data" });
  }
};
