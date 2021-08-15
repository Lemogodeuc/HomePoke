import express from "express";
import { offerController } from "../controllers";

const router = express.Router();

router.get("/:offerId(\\d+)", offerController.getOne);
router.get("/user/:userId(\\d+)", offerController.getAllByUserId);
router.patch("/:offerId(\\d+)/:action(favorite|contacted|delete)", offerController.updateOne);

export default router;
