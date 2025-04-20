import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../requestLogic/postsLogic.mjs";

const router = express.Router();

// posts route
router.get("/", getPosts);

// specific post route
// make sure handle error if id not matched
router.get("/:id", getPost);

// create new post
router.post("/", createPost);

// Update single post
router.put("/:id", updatePost);

// delete post
router.delete("/:id", deletePost);

export default router;
