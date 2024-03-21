import { geminiContent } from "../utils/gemini.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateContent = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title) throw new ApiError(400, "Title is required");
  const content = await geminiContent(title);
  return res.json(
    new ApiResponse(200, { content }, "Content generated successfully")
  );
});

export { generateContent}