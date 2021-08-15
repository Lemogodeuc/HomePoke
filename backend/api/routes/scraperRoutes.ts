import express from "express";
import { scraperController } from "../controllers";

const router = express.Router();

router.get("/:scraperId(\\d+)", scraperController.getOne);
router.get("/user/:userId(\\d+)", scraperController.getAllByUserId);
router.post("/user/:userId(\\d+)", scraperController.createOne);
router.put("/", scraperController.updateOne);
router.delete("/:scraperId(\\d+)", scraperController.deleteOne);

export default router;
