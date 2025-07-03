import jwt from "jsonwebtoken";
import { Student } from "../../models/studentSchema.js";
import { Result } from "../../models/resultSchema.js";
import { getAggregate } from "./aggregateController.js";
import redisConnection, {
  generateRedisKey,
} from "../../utils/redisConnection.js";
import {
  registerUserSchema,
  loginUserSchema,
} from "../../Validator/student-validator.js";

const setUserPoints = async (result, semester) => {
  const aggregates = await getAggregate();
  const { maxResult, minResult } = aggregates.find(
    (agg) => agg.semester == semester
  );

  if (maxResult === minResult) {
    const calcPoints = Math.round(result * 200);
    return Math.round(calcPoints / 10);
  }
  const calcPoints = Math.round(
    ((result - minResult) / (maxResult - minResult)) * 200
  );
  return Math.round(calcPoints);
};

const generateTokens = async (id) => {
  try {
    const user = await Student.findById({ _id: id });
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

const registerUser = async (req, res) => {
  try {
    const { data, error } = registerUserSchema.safeParse(req.body);
    if (error) {
      return res.status(500).json({ message: error.errors[0].message });
    }

    const {
      userEmail,
      userName,
      enrolmentNumber,
      course,
      branch,
      semester,
      password,
    } = data;
    const existedUser = await Student.findOne({ userEmail });
    if (existedUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const ress = await Result.findOne({ enrolmentNumber });
    const result = ress?.result;
    if (!result || !ress) {
      return res
        .status(500)
        .json({ message: "Enter correct enrolment number" });
    }
    if (semester != ress.semester) {
      return res.status(500).json({ message: "Incorrect information" });
    }

    const points = await setUserPoints(result, semester);

    const userDetails = await Student.create({
      userEmail,
      userName,
      enrolmentNumber,
      course,
      branch,
      semester,
      points,
      password,
      result,
    });

    const createdUser = await Student.findById(userDetails._id).select(
      "-password"
    );
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
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { data, error } = loginUserSchema.safeParse(req.body);
    if (error) {
      return res.status(500).json({ message: error.errors[0].message });
    }
    const { userEmail, password } = data;

    const existedUser = await Student.findOne({ userEmail });
    if (!existedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatched = await existedUser.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = await generateTokens(existedUser._id);
    const accessOption = {
      httpOnly: true,
      secure: false,
      samSite: "lax",
      maxAge: eval(process.env.ACCESS_TOKEN_EXPIRY) * 1000,
    };
    const refreshOption = {
      httpOnly: true,
      secure: false,
      samSite: "lax",
      maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, accessOption)
      .cookie("refreshToken", refreshToken, refreshOption)
      .json({
        data: existedUser,
        message: "Login Success",
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = req.user;
    const redisKey = generateRedisKey("student", user._id);
    const cachedUser = await redisConnection.get(redisKey);
    if (cachedUser) {
      console.log("User found in cache");
      return res.status(200).json({
        data: JSON.parse(cachedUser),
        message: "Success",
      });
    }

    const users = await Student.findById({ _id: user._id })
      .select("-password")
      .populate({ path: "projects", model: "StudentProjects" });
    await redisConnection.set(redisKey, JSON.stringify(users), "EX", 60 * 60); // Cache for 1 hour
    return res.status(200).json({ data: users, message: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const allocatePoints = async (req, res) => {
  try {
    const user = await Student.findById({ _id: req.params.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const points = await setUserPoints(user.result, user.semester);
    await Student.updateOne({ _id: req.params.userId }, { points });
    return res.status(200).json({ message: "Points allocated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteAllUsers = async (req, res) => {
  try {
    await Student.deleteMany({});
    return res.status(200).json({ message: "All users deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const validateUser = async (req, res) => {
  return res.status(201).json({ loggedIn: true });
};

const logoutUser = async (req, res) => {
  try {
    const user = req.user;
    const update = await Student.updateOne(
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
      .clearCookie("accessToken", option)
      .clearCookie("refreshToken", option)
      .json({ message: "Logout Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const generateAccessToken = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }
    const isVerified = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await Student.findById(isVerified?._id);
    if (!user) {
      res.status(401).json({ msg: "User validation failed" });
    }
    const accessToken = await user.generateAccessToken();
    const accessOption = {
      httpOnly: true,
      secure: false,
      maxAge: eval(process.env.ACCESS_TOKEN_EXPIRY) * 1000,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, accessOption)
      .json({ accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  allocatePoints,
  getUser,
  deleteAllUsers,
  validateUser,
  logoutUser,
  generateAccessToken,
};
