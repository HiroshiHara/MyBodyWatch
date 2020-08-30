const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

// Get connection of MongoDB(In case of use mongoose)
const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/mybodywatch";
mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;
// define schema.
const bodydataSchema = new mongoose.Schema(
  {
    userid: String,
    weight: Number,
    bmi: Number,
    bfp: Number,
    mm: Number,
    kcal: Number,
    date: String,
  },
  {
    collection: "bodydata",
  }
);
// compile to model from schema.
const bodydata = mongoose.model("bodydata", bodydataSchema);

db.once("open", () => {
  console.log("Database connected:", url);
  // find all document from db.
});

db.on("error", (err) => {
  console.error("connection error:", err);
});

// Setup to use express.
const app = express();

// Resolve path.
const target = path.resolve("../dist/");

// Setup the body-parser.
app.use(bodyParser.urlencoded({ extended: true }));

// Rooting for static files
app.use(express.static(target));
// app.use(`/fuga/piyo`, express.static(path.join(__dirname, 'moi'))));

// Listen on port 3000.
app.listen(3000, () => {
  console.log("listening on 3000");
});

// Resolve GET request.
app.get("/", (req, res) => {
  res.sendFile(target + "/index.html");
});

// Resolve GET request.
app.get("/Chart", (req, res) => {
  console.log("GET request from Chart.js");
  bodydata.find({}, (err, docs) => {
    err ? res.status(500) : res.status(200).send(docs);
  });
});

// 404 error for illegal request.
app.use((req, res) => {
  res.sendStatus(404);
});
