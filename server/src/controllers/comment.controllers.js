import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Comment } from "../models/comment.models.js";

const createComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const postId = req.params.postId;
  const userId = req.user._id;
  if (!content) throw new ApiError(400, "Content is required");
  const comment = await Comment.create({ content, postId, userId });
  res
    .status(201)
    .json(new ApiResponse(201, { comment }, "Comment created successfully"));
});

export { createComment };
