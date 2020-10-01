/**
 * @flow
 */

import React, { Component } from "react";
import axios from "axios";
import dateformat from "dateformat";
import { calcBmi, calcMm, calcKcal } from "../util/calc";
import { checkCreateData, checkUpdateData } from "../util/validation";
import { User } from "../model/User";
import { Header } from "./Header";
import { Chart } from "./Chart";
import { Button } from "./Button";
import { Dialog } from "./Dialog";

type Props = {};
type State = {
  data: Object,
  isDialogOpen: boolean,
  isCreate: boolean,
  tmpId: string,
  tmpDate: string,
  tmpWeight: number,
  tmpBmi: number,
  tmpBfp: number,
  tmpMm: number,
  tmpKcal: number,
};

let user = null;
const defaultDateState = dateformat("yyyy-mm-dd HH:MM");

export class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: {},
      isDialogOpen: false,
      isCreate: false,
      tmpId: "",
      tmpDate: defaultDateState,
      tmpWeight: 0,
      tmpBmi: 0,
      tmpBfp: 0,
      tmpMm: 0,
      tmpKcal: 0,
    };
  }

  makeData(fetchData: Object) {
    const data = {
      _id: [],
      weight: [],
      bmi: [],
      bfp: [],
      mm: [],
      kcal: [],
      date: [],
    };
    for (let i = 0; i < fetchData.length; i++) {
      data._id[i] = fetchData[i]._id;
      data.weight[i] = fetchData[i].weight;
      data.bmi[i] = fetchData[i].bmi;
      data.bfp[i] = fetchData[i].bfp;
      data.mm[i] = fetchData[i].mm;
      data.kcal[i] = fetchData[i].kcal;
      const formatDate = dateformat(fetchData[i].date, "yyyy-mm-dd HH:MM");
      data.date[i] = formatDate;
    }
    return data;
  }

  closeDialog() {
    this.setState({
      isDialogOpen: false,
      isCreate: false,
      tmpId: "",
      tmpDate: defaultDateState,
      tmpWeight: 0,
      tmpBmi: 0,
      tmpBfp: 0,
      tmpMm: 0,
      tmpKcal: 0,
    });
  }

  addButtonHandleClick() {
    this.setState({
      isDialogOpen: true,
      isCreate: true,
    });
  }

  chartHandleClick(
    _id: string,
    date: string,
    weight: number,
    bmi: number,
    bpf: number,
    mm: number,
    kcal: number
  ) {
    console.log(arguments);
    this.setState({
      isDialogOpen: true,
      tmpId: _id,
      tmpDate: date,
      tmpWeight: weight,
      tmpBmi: bmi,
      tmpBfp: bpf,
      tmpMm: mm,
      tmpKcal: kcal,
    });
    console.log(this.state);
  }

  dialogButtonHandleClick(e: Event, action: string) {
    if (action === "cancel") {
      this.closeDialog();
      return;
    }
    if (action === "create") {
      if (!checkCreateData(user._id, this.state)) {
        window.alert("Submit data is invalid.");
        return;
      }
      axios
        .post("create", {
          userid: user._id,
          weight: this.state.tmpWeight,
          date: this.state.tmpDate,
          bmi: this.state.tmpBmi,
          bfp: this.state.tmpBfp,
          mm: this.state.tmpMm,
          kcal: this.state.tmpKcal,
        })
        .then(() => {
          this.closeDialog();
          this.loadChart();
          console.log("Success create data.");
        })
        .catch((err) => {
          console.error(err);
        });
    }
    if (action === "update") {
      if (!checkUpdateData(this.state)) {
        window.alert("Submit data is invalid.");
        return;
      }
      axios
        .post("update", {
          _id: this.state.tmpId,
          weight: this.state.tmpWeight,
          date: this.state.tmpDate,
          bmi: this.state.tmpBmi,
          bfp: this.state.tmpBfp,
          mm: this.state.tmpMm,
          kcal: this.state.tmpKcal,
        })
        .then(() => {
          this.closeDialog();
          this.loadChart();
          console.log("Success update data.");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleChange(e: Event, item: string) {
    if (item === "weight") {
      this.setState({
        tmpWeight: e.target.value,
        tmpBmi: calcBmi(user.height, e.target.value),
        tmpMm: calcMm(e.target.value, this.state.tmpBfp),
        tmpKcal: calcKcal(user.height, e.target.value, user.age, user.sex),
      });
    }
    if (item === "date") {
      this.setState({
        tmpDate: e.target.value,
      });
    }
    if (item === "bmi") {
      this.setState({
        tmpBmi: e.target.value,
      });
    }
    if (item === "bfp") {
      this.setState({
        tmpBfp: e.target.value,
        tmpMm: calcMm(this.state.tmpWeight, e.target.value),
      });
    }
    if (item === "mm") {
      this.setState({
        tmpMm: e.target.value,
      });
    }
    if (item === "kcal") {
      this.setState({
        tmpKcal: e.target.value,
      });
    }
  }

  componentDidMount() {
    let result = null;
    axios
      .get("/login", {
        params: {
          _id: "hrhrs403",
        },
      })
      .then((res) => {
        result = res.data[0];
        user = new User(
          result._id,
          result.height,
          result.age,
          result.sex,
          result.birthday
        );
        this.loadChart();
      })
      .catch((err) => {
        console.error(err);
      });

    // When user keydown 'Esc', close Dialog.
    document.onkeydown = (e) => {
      if (e.keyCode === 27) {
        this.closeDialog();
      }
    };

    // When user click outside Dialog, close Dialog.
    const overlayDivElem = document.getElementById("dialog-overlay");
    overlayDivElem.addEventListener("click", (e) => {
      e.stopPropagation();
      this.closeDialog();
    });
  }

  loadChart() {
    let result = null;
    axios
      .get("/init", {
        params: {
          _id: user._id,
        },
      })
      .then((res) => {
        result = this.makeData(res.data);
        this.setState({
          data: result,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="wrapper">
        <Header />
        <div id="dialog-overlay"></div>
        <div className="main-wrapper">
          <Button
            title="ADD"
            handleClick={this.addButtonHandleClick.bind(this)}
          />
          <Chart
            initData={this.state.data}
            onClickChart={this.chartHandleClick.bind(this)}
          />
          {this.state.isDialogOpen ? (
            <Dialog
              isDialogOpen={true}
              isCreate={this.state.isCreate}
              onChange={this.handleChange.bind(this)}
              onCreate={this.dialogButtonHandleClick.bind(this)}
              onCancel={this.dialogButtonHandleClick.bind(this)}
              _id={this.state.tmpId}
              datetime={this.state.tmpDate}
              weight={this.state.tmpWeight}
              bmi={this.state.tmpBmi}
              bfp={this.state.tmpBfp}
              mm={this.state.tmpMm}
              kcal={this.state.tmpKcal}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
