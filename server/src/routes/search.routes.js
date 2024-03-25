import e, { Router } from "express";
import { searchPosts } from "../controllers/search.controllers.js";

const router = Router();

router.route("/:search").get(searchPosts);

export default router;