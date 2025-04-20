import postsArr from "../data/data.mjs";
// all post logic
const getPosts = (req, res, next) => {
  // add the limit from query obj
  const limit = Number(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    res.json(postsArr.slice(0, limit));
  } else {
    res.json(postsArr);
  }
};

// specific post logic
const getPost = (req, res, next) => {
  const id = Number(req.params.id);
  const post = postsArr.find((post) => post.id === id);

  if (!post) {
    const err = new Error(`Can't find the post with the id of ${id}`);
    err.status = 404;
    return next(err);
  }

  res.status(200).json(post);
};

// create post logic
const createPost = (req, res, next) => {
  const newPost = {
    id: postsArr.length + 1,
    title: req.body.title,
  };

  if (!newPost.title) {
    const err = new Error(`Title must included!`);
    err.status = 400;
    return next(err);
  }

  postsArr.push(newPost);
  res.status(201).json(postsArr);
};

// update post logic
const updatePost = (req, res, next) => {
  const id = Number(req.params.id);
  const post = postsArr.find((post) => post.id === id);

  if (!post) {
    const err = new Error(`Can't update the post with the id of ${id}`);
    err.status = 404;
    return next(err);
  }
  post.title = req.body.title;
  res.status(200).json(postsArr);
};

// delete post logic
const deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = postsArr.find((post) => post.id === id);

  if (!post) {
    const err = new Error(`Can't delete the post with the id of ${id}`);
    err.status = 404;
    return next(err);
  }
  postsArr.splice(post, 1);
  // postsArr = postsArr.filter((post) => post.id !== id);
  res.status(200).json(postsArr);
};

export { getPosts, getPost, createPost, updatePost, deletePost };
