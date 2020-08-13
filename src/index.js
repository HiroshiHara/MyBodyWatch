/**
 * @flow
 */

import React from "react";
import ReactDOM from "react-dom";
import { App } from "./component/App";
import "./style.css";

const member1: Array<string> = ["Tenor Sax", "Soprano Sax"];
const member2: Array<string> = ["Alt Sax", "Soprano Sax", "Baliton Sax"];
const member3: Array<string> = ["Drum"];
const members: Array<Array<string>> = [member1, member2, member3];

ReactDOM.render(<App members={members} />, document.getElementById("app"));
