import express from "express";
const router = express.Router();

import {
  createTour,
  deleteTour,
  getRelatedTour,
  getTour,
  getTourBySearch,
  getTourByTag,
  getTourByUser,
  getTours,
  patchTour,
  likesTour,
} from "../controllers/tour.js";
import auth from "../middleware/auth.js";

router.get("/", getTours);
router.get("/search", getTourBySearch);
router.get("/tag/:tag", getTourByTag);
router.get("/:id", getTour);
router.get("/userTours/:id", auth, getTourByUser);

router.post("/relatedTour", getRelatedTour);
router.post("/", auth, createTour);
router.delete("/:id", auth, deleteTour);
router.patch("/:id", auth, patchTour);
router.patch("/like/:id", auth, likesTour);

export default router;
