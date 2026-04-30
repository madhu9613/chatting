import multer from "multer";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import cloudinary from "../config/cloudinary.js";

dotenv.config();

// ensure uploads folder exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// middleware (same name as before)
export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images allowed"));
    }
  },
});

/* ---------------- CLOUDINARY UPLOAD ---------------- */

export const uploadToCloudinary = async (filePath: string) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "chat-images",
    transformation: [
      { width: 800, height: 600, crop: "limit" },
      { quality: "auto" },
    ],
  });
};

/* ---------------- DELETE LOCAL FILE ---------------- */

export const deleteFile = (filePath: string) => {
  fs.unlink(filePath, (err) => {
    if (err) console.error("Error deleting file:", err);
  });
};