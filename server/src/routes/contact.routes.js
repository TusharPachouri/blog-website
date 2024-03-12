import { Router } from "express";
import { contact } from "../controllers/contact.controllers.js";

const router = Router();

router.route("/").post(contact);

export default router;