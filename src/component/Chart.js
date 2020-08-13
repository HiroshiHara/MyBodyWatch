/**
 * @flow
 */

import React, { Component } from "react";
import c3 from "c3";
import "c3/c3.css";

type Props = {};
type State = {};

export class Chart extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  renderChart() {
    c3.generate({
      bindto: "#chart",
      data: {
        columns: [
          ["data1", 30, 200, 100, 400, 150, 250],
          ["data2", 50, 20, 10, 40, 15, 25],
        ],
      },
    });
  }

  componentDidMount() {
    this.renderChart();
  }

  render() {
    return <div id="chart"></div>;
  }
}
