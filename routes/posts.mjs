import express from "express";
import postsArr from "../data/data.mjs";

const router = express.Router();

// posts route
router.get("/", (req, res, next) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    res.json(postsArr.slice(0, limit));
  } else {
    res.json(postsArr);
  }
});

// specific post route
router.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = postsArr.find((post) => post.id === id);

  if (!post) {
    const err = new Error(`Can't find the post with the id of ${id}`);
    err.status = 404;
    return next(err);
  }

  res.status(200).json(post);
});

export default router;
