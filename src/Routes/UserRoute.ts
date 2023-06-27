import express from "express";
const router = express.Router();
import { updateOnboarding } from "../Controller/updateOnboarding";

router.post("/updateOnboarding",updateOnboarding )

export { router as userRoute}