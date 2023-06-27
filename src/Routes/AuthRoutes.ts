import express from "express";
const router = express.Router();

import { signUpController } from "../Controller/signUpController";

router.post("/register", signUpController)

export { router as authRoute}