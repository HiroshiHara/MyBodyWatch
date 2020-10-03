const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const model = require("./model");
const dateformat = require("dateformat");
const bodydata = model.bodydata;
const user = model.user;

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

app.get("/login", (req, res) => {
  console.log("GET request catched for login.");
  user.find({ _id: req.query._id }, (err, docs) => {
    err ? res.status(500).send() : res.status(200).send(docs);
  });
});

// Resolve get request for initialize chart data.
app.get("/init", (req, res) => {
  console.log("GET request catched for initialize chart data.");
  console.log(req.query._id);
  bodydata.find(
    { userid: req.query._id },
    null,
    { sort: { date: 1 } },
    (err, docs) => {
      err ? res.status(500).send : res.status(200).send(docs);
    }
  );
});

// Resolve post request for create bodydata.
app.post("/create", (req, res) => {
  console.log("POST request catched for create bodydata.");
  const { userid, weight, bmi, bfp, mm, kcal, date } = req.body;
  try {
    checkDuplicate(date, res).then(() => {
      const createData = new bodydata({
        userid: userid,
        weight: weight,
        bmi: bmi,
        bfp: bfp,
        mm: mm,
        kcal: kcal,
        date: date,
      });
      createData.save((err) => {
        if (err) {
          console.log(err);
          res.status(500).send();
        }
        res.status(200).send();
      });
    });
  } catch (e) {
    res.status(500).send();
  }
});

// Resolve post request for update bodydata.
app.post("/update", (req, res) => {
  console.log("POST request catched for update bodydata.");
  console.log(req.body);
  const { _id, userid, weight, bmi, bfp, mm, kcal, date } = req.body;
  if (!checkDuplicate(date, res)) {
    return;
  }
  bodydata.updateOne(
    { _id: _id },
    {
      $set: {
        date: date,
        weight: weight,
        bmi: bmi,
        bfp: bfp,
        mm: mm,
        kcal: kcal,
      },
    },
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send();
      }
      res.status(200).send();
    }
  );
});

// 404 error for illegal request.
app.use((req, res) => {
  res.sendStatus(404);
});

async function checkDuplicate(date, res) {
  const query = dateformat(date, "yyyy-mm-dd");
  await bodydata.find(
    { date: new RegExp(".*" + query + ".*") },
    (err, docs) => {
      if (err) {
        // throw new Error("Internal server error.");
        throw "Internal server error.";
      }
      if (docs.length > 0) {
        // throw new Error("The date is duplicated with existing data.");
        throw "The date is duplicated with existing data.";
      }
    }
  );
}
