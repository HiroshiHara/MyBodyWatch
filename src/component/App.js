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
  tmpDate: string,
  tmpWeight: number,
  tmpBmi: number,
  tmpBfp: number,
  tmpMm: number,
  tmpKcal: number,
};

export class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: {},
      isDialogOpen: false,
      tmpDate: "",
      tmpWeight: 0,
      tmpBmi: 0,
      tmpBfp: 0,
      tmpMm: 0,
      tmpKcal: 0,
    };
  }

  makeData(fetchData: Object) {
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
      const formatDate = dateformat(fetchData[i].date, "yyyy-mm-dd HH:MM");
      data.date[i] = formatDate;
    }
    return data;
  }

  closeDialog() {
    this.setState({
      isDialogOpen: false,
    });
  }

  addButtonHandleClick() {
    this.setState({
      isDialogOpen: true,
    });
  }

  chartHandleClick() {
    this.setState({
      isDialogOpen: true,
    });
  }

  dialogButtonHandleClick(e: Event, action: string) {
    if (action === "cancel") {
      this.closeDialog();
      return;
    }
    if (action === "create") {
      axios
        .post("create", {
          weight: this.state.tmpWeight,
          date: this.state.tmpDate,
          bmi: this.state.tmpBmi,
          bfp: this.state.tmpBfp,
          mm: this.state.tmpMm,
          kcal: this.state.tmpKcal,
        })
        .then(() => {
          this.reloadChart();
          console.log("post success");
        })
        .catch((err) => {
          console.error(err);
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
      .get("/init")
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
      .get("/init")
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
        <Chart initData={this.state.data} />
        {this.state.isDialogOpen ? (
          <Dialog
            isDialogOpen={true}
            isCreate={true}
            onChange={this.handleChange.bind(this)}
            onCreate={this.dialogButtonHandleClick.bind(this)}
            onCancel={this.dialogButtonHandleClick.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}
