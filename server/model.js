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

db.once("open", () => {
  console.log("Database connected:", url);
});

db.on("error", (err) => {
  console.error("connection error:", err);
});

// compile to model from schema. and export.
exports.bodydata = mongoose.model("bodydata", bodydataSchema);
