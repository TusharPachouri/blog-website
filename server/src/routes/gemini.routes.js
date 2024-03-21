import e, { Router } from "express";
import { generateContent } from "../controllers/gemini.controllers.js";

const router = Router();

router.route("/generate").post(generateContent);


export default router;