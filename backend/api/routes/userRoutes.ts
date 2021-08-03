import express from "express";
import { userController } from "../controllers";

const router = express.Router();

router.get("/:userId(\\d+)", userController.getOne);

export default router;