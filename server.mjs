import express from "express";
import posts from "./routes/posts.mjs";
import handleError from "./middleWares/errorHandler.mjs";

const app = express();
let PORT = 3005;

// middlewares
app.use(express.json());

// routes
app.use("/posts/", posts);

// handle not existed route
app.use((req, res, next) => {
  const err = new Error("The page not Existed!");
  err.status = 404;
  next(err);
});

// error handling middleware
app.use(handleError);

app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}`);
});
