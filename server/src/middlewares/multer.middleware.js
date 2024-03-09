import multer from "multer";

const storage = multer.diskStorage({
  storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

export const upload = multer({
  storage,
});
