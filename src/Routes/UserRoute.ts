import express from "express";
const router = express.Router();
import { updateOnboarding } from "../Controller/updateOnboarding";
import { saveSubject } from "../Controller/saveSubjects";
import { fetchSubject } from "../Controller/fetchSubjects";


router.post("/updateOnboarding",updateOnboarding )
router.post("/saveSubject", saveSubject)
router.get("/fetchSubjects",fetchSubject )

export { router as userRoute}