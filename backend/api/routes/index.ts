import { Response, Router } from "express";
import userRoutes from "./userRoutes";
import offerRoutes from "./offerRoutes";
import scraperRoutes from "./scraperRoutes";

const router = Router();

router.get("/", (_, res: Response) => res.json({ data: { message: "Welcome to HomePoke" } }));
router.use("/users", userRoutes);
router.use("/offers", offerRoutes);
router.use("/scrapers", scraperRoutes);

export default router;
