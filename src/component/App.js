/**
 * @flow
 */

import React, { Component } from "react";
import axios from "axios";
import dateformat from "dateformat";
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

let loginUserId = "";
let loginUserHeight = "";
let loginUserAge = "";
let loginUserBirthday = "";
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
  }

  dialogButtonHandleClick(e: Event, action: string) {
    if (action === "cancel") {
      this.closeDialog();
      return;
    }
    if (action === "create") {
      console.log(this.state.tmpDate);
      axios
        .post("create", {
          userid: loginUserId,
          weight: this.state.tmpWeight,
          date: this.state.tmpDate,
          bmi: this.state.tmpBmi,
          bfp: this.state.tmpBfp,
          mm: this.state.tmpMm,
          kcal: this.state.tmpKcal,
        })
        .then(() => {
          // this.closeDialog();
          this.reloadChart();
          console.log("Success create data.");
        })
        .catch((err) => {
          console.error(err);
        });
    }
    if (action === "update") {
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
          this.reloadChart();
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
        loginUserId = result._id;
        console.log(loginUserId);
        loginUserHeight = result.height;
        loginUserAge = result.age;
        loginUserBirthday = result.birthday;
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get("/init", {
        params: {
          _id: "hrhrs403",
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

    // When user keydown 'Esc', close Dialog.
    document.onkeydown = (e) => {
      if (e.keyCode === 27) {
        this.closeDialog();
      }
    };
  }

  reloadChart() {
    let result = null;
    axios
      .get("/init", {
        params: {
          _id: loginUserId,
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
      <div className="main-wrapper">
        <Header />
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
    );
  }
}
