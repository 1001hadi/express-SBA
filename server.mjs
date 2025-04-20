import express from "express";
import posts from "./routes/posts.mjs";

const app = express();
let PORT = 3005;

// routes
app.use("/posts/", posts);

app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}`);
});
