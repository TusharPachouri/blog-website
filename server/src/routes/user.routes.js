import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserToken,
  changeCurrentPassword,
  getCurrentUser,
  getUserById,
  deleteCurrentUser
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

router.route("/refresh").post(refreshUserToken);

router.route("/user/:id").get(getUserById);

//secure routes:

router.route("/logout").get(verifyJWT, logoutUser);

router.route("/change-password").patch(verifyJWT, changeCurrentPassword);

router.route("/user").get(verifyJWT, getCurrentUser);

router.route("/delete").delete(verifyJWT, deleteCurrentUser);

export default router;
