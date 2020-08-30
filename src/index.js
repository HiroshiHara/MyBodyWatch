/**
 * @flow
 */

import React from "react";
import ReactDOM from "react-dom";
import { App } from "./component/App";
import "./style.css";
import axios from "axios";

async function fetchChartData() {
  let result = null;
  axios
    .get("/Chart")
    .then((res) => {
      result = initData(res.data);
      ReactDOM.render(
        <App initData={result} />,
        document.getElementById("app")
      );
    })
    .catch((err) => {
      console.error(err);
    });
}

function initData(fetchData) {
  const data = {
    weight: [],
    bmi: [],
    bfp: [],
    mm: [],
    kcal: [],
    date: [],
  };
  for (let i = 0; i < fetchData.length; i++) {
    data.weight[i] = fetchData[i].weight;
    data.bmi[i] = fetchData[i].bmi;
    data.bfp[i] = fetchData[i].bfp;
    data.mm[i] = fetchData[i].mm;
    data.kcal[i] = fetchData[i].kcal;
    data.date[i] = fetchData[i].date;
  }
  return data;
}

fetchChartData();
