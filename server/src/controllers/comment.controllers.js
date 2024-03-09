import { Comment } from "../models/comment.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const postId = req.params.postId;
  const userId = req.user._id;
  if (!content) throw new ApiError(400, "Content is required");
  const comment = await Comment.create({
    content,
    post: postId,
    owner: userId,
  });
  res
    .status(201)
    .json(new ApiResponse(201, { comment }, "Comment created successfully"));
});

const getCommentsByPostId = asyncHandler(async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comment.find({ post: postId }).populate(
    "owner",
    "username avatar"
  );
  res
    .status(200)
    .json(new ApiResponse(200, { comments }, "Comments fetched successfully"));
});

const updateCommentById = asyncHandler(async (req, res) => {
  const commentId = req.params.commentId;
  const comment = await Comment.findById(commentId);
  if (!comment) throw new ApiError(404, "Comment not found");
  if (comment.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized");
  }
  const { content } = req.body;
  if (!content) throw new ApiError(400, "Content is required");
  await Comment.updateOne({ _id: commentId }, { content });
  const updatedComment = await Comment.findById(comment._id).populate(
    "owner",
    "username avatar"
  );

  res
    .status(200)
    .json(
      new ApiResponse(200, { updatedComment }, "Comment updated successfully")
    );
});

const deleteCommentById = asyncHandler(async (req, res) => {
  const commentId = req.params.commentId;
  const comment = await Comment.findById(commentId);
  if (!comment) throw new ApiError(404, "Comment not found");
  if (comment.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized");
  }
  await Comment.deleteOne({ _id: commentId });
  res
    .status(200)
    .json(new ApiResponse(200, null, "Comment deleted successfully"));
});

export {
  createComment,
  getCommentsByPostId,
  deleteCommentById,
  updateCommentById,
};
