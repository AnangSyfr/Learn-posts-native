import { findPost } from "../controllers/PostController";
import express from "express";

const router = express.Router();

router.get("/posts", findPost);

export { router };
