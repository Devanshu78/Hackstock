import { Router } from "express";
import { upload } from "../middleware/multer.js";
import { authMiddleware } from "../middleware/adminAuth-middleware.js";
import { cacheMiddleware } from "../middleware/cacheMiddleware.js";
import { CACHE_TTL } from "../utils/cacheKeys.js";

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

import {
  getCacheHealth,
  clearAllCache,
  clearCacheByPattern,
  getAllCacheKeys,
} from "../Controllers/admin/cacheController.js";

const router = Router();

//events (cached - 1 minute for active events)
router
  .route("/event")
  .post(authMiddleware, createEvent)
  .get(
    authMiddleware,
    cacheMiddleware("events", CACHE_TTL.SHORT),
    getEvent
  );
router.route("/event/:id").delete(authMiddleware, deleteEvent);

//user api's
router.route("/login").post(loginTeacher);
router.route("/register").post(registerTeacher);
router.route("/logout").get(authMiddleware, logoutTeacher);
router.route("/isverified").get(authMiddleware, isVerifiedTeacher);
router.route("/refresh").get(generateAccessToken);
router.route("/userdata").get(authMiddleware, getUserData);
//get projects (cached - 5 minutes)
router
  .route("/getprojects/:id")
  .get(
    authMiddleware,
    cacheMiddleware("projects", CACHE_TTL.MEDIUM, (req) => `projects:teacher:${req.params.id}`),
    getProjects
  )
  .put(authMiddleware, changeProjectStatus);

// result (cached - 30 minutes, rarely changes)
router
  .route("/result")
  .post(authMiddleware, upload.single("file"), addResult)
  .get(
    authMiddleware,
    cacheMiddleware("results", CACHE_TTL.LONG),
    getResults
  );
router
  .route("/result/:id")
  .put(authMiddleware, updateResult)
  .delete(authMiddleware, deleteResult);

//component api's (cached - 5 minutes)
router
  .route("/component")
  .post(
    authMiddleware,
    upload.fields([{ name: "componentImage", maxCount: 1 }]),
    addComponent
  )
  .get(
    authMiddleware,
    cacheMiddleware("components", CACHE_TTL.MEDIUM),
    getComponent
  );
router
  .route("/component/:id")
  .delete(authMiddleware, deleteComponent)
  .put(authMiddleware, updateComponent);

// bidding api's (cached - 1 minute for near real-time)
router.route("/evalresult").get(processResult);
router.route("/getwinner").get(
  authMiddleware,
  cacheMiddleware("winners", CACHE_TTL.SHORT),
  getWinnerResult
);
router.route("/updatewinner/:id").put(authMiddleware, processWinnerStatus);

// Cache management routes (admin only)
router.route("/cache/health").get(authMiddleware, getCacheHealth);
router.route("/cache/clear").delete(authMiddleware, clearAllCache);
router.route("/cache/clear-pattern").post(authMiddleware, clearCacheByPattern);
router.route("/cache/keys").get(authMiddleware, getAllCacheKeys);

export default router;
