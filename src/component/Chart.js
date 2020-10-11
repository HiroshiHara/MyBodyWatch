/**
 * @flow
 */

import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import c3 from "c3";
import "c3/c3.css";

type Props = {
  initData: Object,
  currentYearMonth: string,
  onClickChart: Function,
  onClickAngleHandler: Function,
};
type State = {};

export class Chart extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  renderChart() {
    const chartData = this.props.initData;
    const onClickChart = this.props.onClickChart;
    c3.generate({
      /**
       * Rendering Chart on this id.
       */
      bindto: "#chart",

      /**
       * Chart title.
       */
      title: {
        text: this.props.currentYearMonth,
      },

      /**
       * Setting Data for the Chart.
       */
      data: {
        x: "date",
        xFormat: "%Y-%m-%d %H:%M",
        json: chartData,
        // "y2" define right y-axis for different unit.
        axes: {
          kcal: "y2",
        },
        // Make certain data to different look.
        types: {
          kcal: "bar",
        },
        hide: ["_id"],
        onclick: function (d, i) {
          const index = d.index;
          const chartId = chartData._id[index];
          const chartDate = chartData.date[index];
          const chartWeight = chartData.weight[index];
          const chartBmi = chartData.bmi[index];
          const chartBfp = chartData.bfp[index];
          const chartMm = chartData.mm[index];
          const chartKcal = chartData.kcal[index];
          onClickChart(
            chartId,
            chartDate,
            chartWeight,
            chartBmi,
            chartBfp,
            chartMm,
            chartKcal
          );
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
       * Setting a tickness for legend.
       */
      legend: {
        hide: ["_id"],
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
        pattern: [
          "#fff",
          "#f76876",
          "#686af7",
          "#d1e03f",
          "#f7a668",
          "#afdec1",
        ],
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.initData !== this.props.initData) {
      this.renderChart();
    }
  }

  render() {
    return (
      <div className="chart-wrapper">
        <div className="chart-container">
          <span>
            <FontAwesomeIcon
              icon={faAngleDoubleLeft}
              className="previous-button"
              onClick={() => this.props.onClickAngleHandler(-1)}
            />
          </span>
          <div id="chart" className="chart"></div>
          <span>
            <FontAwesomeIcon
              icon={faAngleDoubleRight}
              className="next-button"
              onClick={() => this.props.onClickAngleHandler(1)}
            />
          </span>
        </div>
      </div>
    );
  }
}
