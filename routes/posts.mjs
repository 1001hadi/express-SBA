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
