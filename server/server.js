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

// Listen on port heroku default port or 3000.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("listening on " + PORT);
});

// rootへのアクセス
app.get("/", (req, res) => {
  res.sendFile(target + "/index.html");
});

// ログイン時のアクセス
app.get("/login", (req, res) => {
  console.log("GET request catched for login.");
  user.find({ _id: req.query._id }, (err, docs) => {
    err ? res.status(500).send() : res.status(200).send(docs);
  });
});

// チャート読み込み時のアクセス
app.get("/load", (req, res) => {
  console.log("GET request catched for initialize chart data.");
  console.log(req.query.date);
  bodydata.find(
    { userid: req.query._id, date: new RegExp(".*" + req.query.date + ".*") },
    null,
    { sort: { date: 1 } },
    (err, docs) => {
      err ? res.status(500).send : res.status(200).send(docs);
    }
  );
});

// bodydata登録時のアクセス
app.post("/create", (req, res) => {
  console.log("POST request catched for create bodydata.");
  const { userid, weight, bmi, bfp, mm, kcal, date } = req.body;
  console.log(req.body);
  countDocsByDate(date).then((result) => {
    if (result === 0) {
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
    } else {
      res.status(200).send({ errcd: 1 });
    }
  });
});

// bodydata更新時のアクセス
app.post("/update", (req, res) => {
  console.log("POST request catched for update bodydata.");
  const { _id, userid, weight, bmi, bfp, mm, kcal, date } = req.body;
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

// 404エラー処理
app.use((req, res) => {
  res.sendStatus(404);
});

/**
 * 年月日をキーに該当するドキュメントの件数を取得する。
 * @param {string} date bodydataのdateフィールド情報
 */
async function countDocsByDate(date) {
  const query = dateformat(date, "yyyy-mm-dd");
  const result = await bodydata.count(
    { date: new RegExp(".*" + query + ".*") },
    (err, count) => {
      if (err) throw new Error("Count docs error.");
      console.log(`duplicate date docs are ${count} founds.`);
    }
  );
  return result;
}
