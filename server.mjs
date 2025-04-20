import express from "express";
import posts from "./routes/posts.mjs";
import handleError from "./middleWares/errorHandler.mjs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
let PORT = 3005;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/posts/", posts);

// run the engine for  EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Posts",
    message: "Welcome to the posts page!",
  });
});

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
