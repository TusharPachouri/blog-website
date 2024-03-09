import { Router } from "express";
import {
  createComment,
  getCommentsByPostId,
  deleteCommentById,
  updateCommentById,
} from "../controllers/comment.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create/:postId").post(verifyJWT, createComment);

router.route("/:postId").get(getCommentsByPostId);

router.route("/:commentId").delete(verifyJWT, deleteCommentById);

router.route("/:commentId").put(verifyJWT, updateCommentById);

export default router;
