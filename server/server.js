const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

// Setup to use express.
const app = express();

// Get connection of MongoDB(In case of unuse mongoose)
// const MongoClient = require("mongodb").MongoClient;
// const url = "mongodb://127.0.0.1:27017";
// const dbName = "mybodywatch";
// let db;
// MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
//   if (err) {
//     return console.log(err);
//   }
//   // Storing a reference to the database so you can use it later.
//   db = client.db(dbName);
//   console.log(`Connected MongoDB: ${url}`);
//   console.log(`Database: ${dbName}`);
// });

// Get connection of MongoDB(In case of use mongoose)
const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/mybodywatch";
mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;
db.once("open", () => {
  console.log("Database connected:", url);
  // define schema.
  const bodydataSchema = new mongoose.Schema(
    {
      userid: String,
      weight: Number,
      bmi: Number,
      bfp: Number,
      mm: Number,
      kcal: Number,
      date: Date,
    },
    {
      collection: "bodydata",
    }
  );
  // compile to model from schema.
  const bodydata = mongoose.model("bodydata", bodydataSchema);
  bodydata.find({}, (err, docs) => {
    console.log(docs);
  });
});

db.on("error", (err) => {
  console.error("connection error:", err);
});

// Resolve path.
const target = path.resolve("../dist/");

// Setup the body-parser.
app.use(bodyParser.urlencoded({ extended: true }));

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

// Resolve POST request.
app.post("/postTest", (req, res) => {
  console.log(req.body);
});
