import { User } from "../models/user.models.js";
import { Post } from "../models/post.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const searchPosts = asyncHandler(async (req, res) => {
  const { search } = req.params;
  const posts = await Post.find({
    $or: [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ],
  });

  return res.status(200).json(new ApiResponse(200, { posts }, "Posts found"));
});

export { searchPosts };
