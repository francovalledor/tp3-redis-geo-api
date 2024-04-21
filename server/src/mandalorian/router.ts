import { Router } from "express";
import controller from "./controller";

export const router = Router();

router.get("/", controller.getDetails);
router.get("/episode", controller.getEpisodeDetails);
router.post("/reserve", controller.reserve);
router.post("/pay", controller.pay);
