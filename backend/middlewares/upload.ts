import multer, { FileFilterCallback } from "multer";
import path from "path";
import crypto from "crypto";
import { Request, Express } from "express";

const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const fileHash = crypto.randomBytes(16).toString("hex");
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, `${fileHash}${ext}`);
    },
});

const fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => void = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid extension"));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});

export { upload };
