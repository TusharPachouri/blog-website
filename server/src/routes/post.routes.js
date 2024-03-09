import { Router } from "express";
import {
  createPost,
  getPosts,
  getLoggedInUserAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
} from "../controllers/post.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/create").post(verifyJWT, upload.single("postImage"), createPost);

router.route("/").get(getPosts);

router.route("/user").get(verifyJWT, getLoggedInUserAllPosts);

router.route("/:postId").get(getPostById);

router
  .route("/update/:postId")
  .put(verifyJWT, upload.single("postImage"), updatePostById);

router.route("/delete/:postId").delete(verifyJWT, deletePostById);

export default router;
