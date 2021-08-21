import express from "express";
import { userController } from "../controllers";

const router = express.Router();

router.get("/:userId(\\d+)", userController.getOne);
router.post("/login", userController.login);
router.put("/create", userController.createOne);
router.patch("/update", userController.updateOne);

export default router;
