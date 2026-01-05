import { Router } from "express";
import { upload } from "../middleware/multer.js";
import { authMiddleware } from "../middleware/userAuth-middleware.js";
import { cacheMiddleware } from "../middleware/cacheMiddleware.js";
import { CACHE_TTL } from "../utils/cacheKeys.js";

import {
  registerUser,
  loginUser,
  allocatePoints,
  deleteAllUsers,
  getUser,
  validateUser,
  logoutUser,
  generateAccessToken,
  registerManyUsers,
  updateUserData
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

//
router.route("/registerManyUsers").post(registerManyUsers);
router.route("/upgrade").patch(updateUserData);
// get component (cached - 5 minutes)
router.route("/component").get(
  authMiddleware,
  cacheMiddleware("components", CACHE_TTL.MEDIUM),
  getComponent
);

// get event (cached - 1 minute for real-time updates)
router.route("/event").get(
  authMiddleware,
  cacheMiddleware("event", CACHE_TTL.SHORT),
  eventForUser
);

// allocate Points
router.route("/allocatepoints/:userId").get(allocatePoints);

// aggregate (cached - 30 minutes, rarely changes)
router.route("/getAggregate").get(
  cacheMiddleware("aggregates", CACHE_TTL.LONG),
  getAggregate
);

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

//Project Id (cached - 5 minutes)
router.route("/getproject/:id").get(
  authMiddleware,
  cacheMiddleware("project", CACHE_TTL.MEDIUM, (req) => `project:${req.params.id}`),
  getProjects
);
router.route("/updateproject/:id").put(authMiddleware, updateProject);
router.route("/deleteproject/:id").delete(authMiddleware, deleteProject);

// Get all projects (cached - 5 minutes)
router.route("/getallproject").get(
  authMiddleware,
  cacheMiddleware("projects", CACHE_TTL.MEDIUM, (req) => `projects:user:${req.user._id}`),
  getAllProjects
);

//Bidding Result (cached - 1 minute for near real-time)
router.route("/getwinner").get(
  authMiddleware,
  cacheMiddleware("winners", CACHE_TTL.SHORT, (req) => `winners:user:${req.user._id}`),
  getWinnerResult
);

export default router;
