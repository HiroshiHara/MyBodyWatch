/**
 * @flow
 */

import React, { Component } from "react";
import c3 from "c3";
import "c3/c3.css";
import { SAMPLE_DATA } from "../sampleData";

type Props = {};
type State = {};

export class Chart extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  renderChart() {
    /**
     * Generate mock data.
     */
    const mockData = SAMPLE_DATA;
    const data = {
      weight: [],
      bmi: [],
      bfp: [],
      mm: [],
      kcal: [],
      date: [],
    };
    for (let i = 0; i < mockData.length; i++) {
      data.weight[i] = mockData[i].weight;
      data.bmi[i] = mockData[i].bmi;
      data.bfp[i] = mockData[i].bfp;
      data.mm[i] = mockData[i].mm;
      data.kcal[i] = mockData[i].kcal;
      data.date[i] = mockData[i].date;
    }

    c3.generate({
      /**
       * Rendering Chart on this id.
       */
      bindto: "#chart",

      /**
       * Setting Data for the Chart.
       */
      data: {
        x: "date",
        json: data,
        // "y2" define right y-axis for different unit.
        axes: {
          kcal: "y2",
        },
        // Make certain data to different look.
        types: {
          kcal: "bar",
        },
      },

      /**
       * Setting axis for the Chart.
       */
      axis: {
        // Setting values for the x-axis.
        x: {
          type: "timeseries",
          tick: {
            format: "%Y-%m-%d",
          },
        },
        // Setting labels for the y-axis(left).
        y: {
          label: {
            text: "Weight(kg), BMI, BFP, MM",
            position: "outer-middle",
          },
        },
        // Setting labels for the y-axis(right).
        y2: {
          label: {
            text: "kcal",
            position: "outer-middle",
          },
          show: true,
        },
      },

      /**
       * Setting a tickness for bar chart.
       */
      bar: {
        width: {
          ratio: 0.42,
        },
      },

      /**
       * Show the grid on y-axis.
       */
      grid: {
        y: {
          show: true,
        },
      },

      /**
       * Setting height on Whole of the Chart.
       */
      size: {
        height: 600,
      },

      /**
       * Setting color on graphs.
       */
      color: {
        pattern: ["#f76876", "#686af7", "#d1e03f", "#f7a668", "#afdec1"],
      },

      /**
       * Setting point size on graphs.
       */
      point: {
        r: 5,
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
