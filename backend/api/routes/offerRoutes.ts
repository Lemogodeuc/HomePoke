import express from "express";
import { offerController } from "../controllers";

const router = express.Router();

router.get("/:offerId(\\d+)", offerController.getOne);
router.get("/profile/:profileId(\\d+)", offerController.getAllByProfileId);

export default router;
