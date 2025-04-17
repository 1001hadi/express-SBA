import express from "express";

const app = express();
let PORT = 3005;

app.get("/", (req, res) => {
  res.send("This is just starter!");
});

app.get("/test", (req, res) => {
  res.send("This is just tester!");
});

app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}`);
});
