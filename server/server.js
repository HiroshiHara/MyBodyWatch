// Setup to use express.
const express = require("express");
const app = express();

// Resolve path.
const path = require("path");
const target = path.resolve("../dist/");

// Rooting for static files
app.use(express.static(path.join(target)));

// Listen on port 3000.
app.listen(3000, () => {
  console.log("listening on 3000");
});

// Resolve GET request.
app.get("/", (req, res) => {
  res.sendFile(target + "index.html");
});
