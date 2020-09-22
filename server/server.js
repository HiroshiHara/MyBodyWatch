const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const model = require("./model");
const bodydata = model.bodydata;

// Setup to use express.
const app = express();

// Resolve path.
const target = path.resolve("../dist/");

// Setup the body-parser.
app.use(bodyParser.json());
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

// Resolve get request for initialize chart data.
app.get("/init", (req, res) => {
  console.log("GET request catched for initialize chart data.");
  bodydata.find({}, (err, docs) => {
    err ? res.status(500) : res.status(200).send(docs);
  });
});

// Resolve post request for create bodydata.
app.post("/create", (req, res) => {
  console.log("POST request catched for create bodydata.");
  console.log(req.body);
  res.status(200).send();
});

// 404 error for illegal request.
app.use((req, res) => {
  res.sendStatus(404);
});
