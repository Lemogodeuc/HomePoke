import express from "express";
import { scraperController } from "../controllers";

const router = express.Router();

router.get("/:scraperId(\\d+)", scraperController.getOne);
router.get("/user/:userId(\\d+)", scraperController.getAllByUserId);
router.put("/create", scraperController.createOne);
router.put("/update", scraperController.updateOne);
router.patch("/toogle/:scraperId(\\d+)", scraperController.toggleOne);
router.delete("/:scraperId(\\d+)", scraperController.deleteOne);

export default router;
