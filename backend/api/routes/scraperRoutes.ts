import express from "express";
import { scraperController } from "../controllers";

const router = express.Router();

router.get("/:scraperId(\\d+)", scraperController.getOne);
router.get("/profile/:profileId(\\d+)", scraperController.getAllByProfileId);
router.post("/profile/:profileId(\\d+)", scraperController.createOne);
router.put("/", scraperController.updateOne);
router.delete("/:scraperId(\\d+)", scraperController.deleteOne);

export default router;
