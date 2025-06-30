import { Router } from "express";
import { upload } from "../middleware/multer.js";
import { authMiddleware } from "../middleware/adminAuth-middleware.js";
import {
  processResult,
  getWinnerResult,
  processWinnerStatus,
} from "../Controllers/admin/biddingController.js";
import {
  addResult,
  getResults,
  updateResult,
  deleteResult,
} from "../Controllers/admin/resultController.js";

import {
  addComponent,
  getComponent,
  deleteComponent,
  updateComponent,
} from "../Controllers/admin/componentController.js";

import {
  loginTeacher,
  registerTeacher,
  isVerifiedTeacher,
  logoutTeacher,
  generateAccessToken,
  getUserData,
} from "../Controllers/admin/teacherController.js";

import {
  createEvent,
  getEvent,
  deleteEvent,
} from "../Controllers/admin/eventController.js";

import {
  getProjects,
  changeProjectStatus,
} from "../Controllers/users/uploadProjectControllers.js";

const router = Router();

//events
router
  .route("/event")
  .post(authMiddleware, createEvent)
  .get(authMiddleware, getEvent);
router.route("/event/:id").delete(authMiddleware, deleteEvent);

//user api's
router.route("/login").post(loginTeacher);
router.route("/register").post(registerTeacher);
router.route("/logout").get(authMiddleware, logoutTeacher);
router.route("/isverified").get(authMiddleware, isVerifiedTeacher);
router.route("/refresh").get(generateAccessToken);
router.route("/userdata").get(authMiddleware, getUserData);
//get projects
router
  .route("/getprojects/:id")
  .get(authMiddleware, getProjects)
  .put(authMiddleware, changeProjectStatus);

// result
router
  .route("/result")
  .post(authMiddleware, upload.single("file"), addResult)
  .get(authMiddleware, getResults);
router
  .route("/result/:id")
  .put(authMiddleware, updateResult)
  .delete(authMiddleware, deleteResult);

//component api's
router
  .route("/component")
  .post(
    authMiddleware,
    upload.fields([{ name: "componentImage", maxCount: 1 }]),
    addComponent
  )
  .get(authMiddleware, getComponent);
router
  .route("/component/:id")
  .delete(authMiddleware, deleteComponent)
  .put(authMiddleware, updateComponent);

// bidding api's
router.route("/evalresult").get(processResult);
router.route("/getwinner").get(authMiddleware, getWinnerResult);
router.route("/updatewinner/:id").put(authMiddleware, processWinnerStatus);

export default router;
