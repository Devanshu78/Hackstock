import { Router } from "express";
import { upload } from "../middleware/multer.js";
import { authMiddleware } from "../middleware/userAuth-middleware.js";

import {
  registerUser,
  loginUser,
  allocatePoints,
  deleteAllUsers,
  getUser,
  validateUser,
  logoutUser,
  generateAccessToken,
} from "../Controllers/users/studentContollers.js";

import { getComponent } from "../Controllers/admin/componentController.js";
import { eventForUser } from "../Controllers/admin/eventController.js";
import { getAggregate } from "../Controllers/users/aggregateController.js";
import {
  addProject,
  deleteProject,
  getProjects,
  updateProject,
  getAllProjects,
} from "../Controllers/users/uploadProjectControllers.js";
import { getWinnerResult } from "../Controllers/admin/biddingController.js";

const router = Router();

// users api
router.route("/registerUser").post(registerUser);
router.route("/loginuser").post(loginUser);
router.route("/logoutuser").post(authMiddleware, logoutUser);
router.route("/deleteallusers").delete(deleteAllUsers);
router.route("/getuser").get(authMiddleware, getUser);
router.route("/isAuthenticated").get(authMiddleware, validateUser);
router.route("/refresh").get(generateAccessToken);

// get component
router.route("/component").get(authMiddleware, getComponent);
router.route("/event").get(authMiddleware, eventForUser);

// allocate Points
router.route("/allocatepoints/:userId").get(allocatePoints);

// aggergate
router.route("/getAggregate").get(getAggregate);

//add project
router.route("/addproject").post(
  upload.array("projectImage", 10),
  (req, res, next) => {
    if (req.body.projectComponents) {
      req.body.projectComponents = JSON.parse(req.body.projectComponents);
    }
    next();
  },
  authMiddleware,
  addProject
);

//Project Id
// router.route("/getproject/:id").get(getProjects);
router.route("/getproject/:id").get(authMiddleware, getProjects);
router.route("/updateproject/:id").put(authMiddleware, updateProject);
router.route("/deleteproject/:id").delete(authMiddleware, deleteProject);
router.route("/getallproject").get(authMiddleware, getAllProjects);

//Bidding Result
router.route("/getwinner").get(authMiddleware, getWinnerResult);

export default router;
