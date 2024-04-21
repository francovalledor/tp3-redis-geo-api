import { Router } from "express";
import controller from "./controller";

export const router = Router();

router.get("/pois", controller.listPOIs);
router.post("/pois", controller.addPointOfInterest);
router.post("/pois/:poi/", controller.addPlace);
