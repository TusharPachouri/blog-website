import { Contact } from "../utils/contact.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const contact = asyncHandler(async (req, res) => {
  const { name, email, subject, contactNumber, message } = req.body;
  // if (!name || !email || !subject || !message) {
  //   throw new ApiError(500, "Send all required fields");
  // }
  const result = await Contact(name, email, subject, contactNumber, message);
  if (result instanceof Error) {
    throw new ApiError(500, "Error while sending message");
  }
  res
    .status(200)
    .json(new ApiResponse(200, result, "Message Sent Successfully!"));
});

export { contact };
