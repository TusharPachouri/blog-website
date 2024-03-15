import { Post } from "../models/post.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

const createPost = asyncHandler(async (req, res) => {
  const { title, content, userId } = req.body;

  if (!title || !content)
    throw new ApiError(400, "Title and content are required");
  if (!req.user._id) throw new ApiError(401, "Unauthorized");
  let postImage = null;
  if (req.file) {
    const imageLocalPath = req.file.path;
    const uploadResult = await uploadOnCloudinary(imageLocalPath, "postImage");
    postImage = uploadResult.secure_url;
  }
  const post = new Post({
    title,
    content,
    postImage,
    owner: userId,
    comments: [],
  });

  await post.save();
  res
    .status(201)
    .json(new ApiResponse(201, { post }, "Post created successfully"));
});

const getPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find().populate("owner", "username avatar fullName");
    res.status(200).json(new ApiResponse(200, { posts }));
  } catch (error) {
    console.log("Error while fetching the posts: ", error.message);
    res
      .status(500)
      .json(new ApiResponse(500, null, "Error while fetching posts"));
  }
});

const getLoggedInUserAllPosts = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) throw new ApiError(404, "User not found");
    const posts = await Post.find({ owner: user._id }).populate(
      "owner",
      "username avatar fullName"
    );
    res.status(200).json(new ApiResponse(200, { posts }));
  } catch (error) {
    console.log("Error while fetching the posts: ", error.message);
    res
      .status(500)
      .json(new ApiResponse(500, null, "Error while fetching posts"));
  }
});

const getPostById = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  if (!postId) throw new ApiError(400, "Post Id is required");
  const post = await Post.findById(postId).populate(
    "owner",
    "username avatar fullName"
  );
  if (!post) throw new ApiError(404, "Post not found");
  res.status(200).json(new ApiResponse(200, { post }, "Post found"));
});

const updatePostById = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;
  if (!postId) throw new ApiError(400, "Post Id is required");
  if (!title || !content)
    throw new ApiError(400, "Title and content are required");
  const post = await Post.findById(postId);
  let postImageLocal = null;
  if (req.file) {
    const imageLocalPath = req.file.path;
    await deleteFromCloudinary(post.postImage, "image", "postImage");
    const uploadResult = await uploadOnCloudinary(imageLocalPath, "postImage");
    postImageLocal = uploadResult.secure_url;
  }

  if (!post) throw new ApiError(404, "Post not found");

  if (post.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this post");
  }
  post.title = title;
  post.content = content;
  post.postImage = postImageLocal;
  await post.save();
  res
    .status(200)
    .json(new ApiResponse(200, { post }, "Post updated successfully"));
});

const deletePostById = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  if (!postId) throw new ApiError(400, "Post Id is required");
  const post = await Post.findById(postId);
  if (!post) throw new ApiError(404, "Post not found");
  if (post.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this post");
  }
  await deleteFromCloudinary(post.postImage, "image", "postImage");
  await Post.deleteOne({ _id: post._id });
  res.status(200).json(new ApiResponse(200, null, "Post deleted successfully"));
});
export {
  createPost,
  getPosts,
  getLoggedInUserAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
