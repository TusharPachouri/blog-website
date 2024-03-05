import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // console.log(response)
    // console.log("File uploaded successfully: ", response.url);
    fs.unlinkSync(localFilePath); // no need if we are sending file using memory storage
    return response;
  } catch (err) {
    fs.unlinkSync(localFilePath); // remove the locally saved files as the upload operation got failed
  }
};
const deleteFromCloudinary = async (url) => {
  try {
    const filePublicId = url.split("/").pop().split(".")[0];
    const response = await cloudinary.uploader.destroy(filePublicId, {});
    // console.log("File deleted successfully");
    return response;
  } catch (err) {
    console.error("Error while deleting the file: ", err);
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
