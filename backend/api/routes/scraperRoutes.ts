import express from "express";
import { scraperController } from "../controllers";

const router = express.Router();

router.get("/:scraperId(\\d+)", scraperController.getOne);
router.get("/profile/:profileId(\\d+)", scraperController.getAllByProfileId);

export default router;
