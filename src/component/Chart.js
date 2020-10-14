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
  chartData: Object, // 表示するデータ(カラム名:配列 のオブジェクト)
  currentYearMonth: string, // 表示するデータの期間(YYYY-MM)
  onClickChart: Function, // チャート上の任意のデータをクリックしたときのイベントハンドラ
  onClickAngleHandler: Function, // チャート左右のアイコンをクリックしたときのイベントハンドラ
};
type State = {};

/**
 * Chartコンポーネント。<br>
 * bodydataドキュメントをもとにグラフを表示する。<br>
 * 表示するデータは以下の通り。<br>
 * <ul>
 *    <li>体重(kg)</li>
 *    <li>体脂肪率(%)</li>
 *    <li>BMI</li>
 *    <li>筋肉量(%)</li>
 *    <li>基礎代謝(kcal)</li>
 * </ul>
 */
export class Chart extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  /**
   * チャートをレンダリングするメソッド。<br>
   * c3.generate()を内部で実行する。直接render()内でc3.generate()を実行しても正常にレンダリングされないので、<br>
   * このメソッドはcomponentDidMount()でコールされる。
   */
  renderChart() {
    const chartData = this.props.chartData;
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
        xFormat: "%Y-%m-%d",
        json: chartData,
        // "y2" define right y-axis for different unit.
        axes: {
          kcal: "y2",
        },
        // Make certain data to different look.
        types: {
          kcal: "bar",
        },
        // -------------------------------------------------------------------
        // chartDataにはデフォルトでbodydataの_idプロパティも格納されているので、
        // チャートに表示されないよう隠す。
        // -------------------------------------------------------------------
        hide: ["_id"],
        // -------------------------------------------------------------------
        // チャート上の任意のデータをクリックしたときのイベントハンドラ。
        // データの値を引数にthis.props.onClickChartを実行する。
        // -------------------------------------------------------------------
        onclick: function (d) {
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

  /**
   * 更新前のbodydataと更新後のbodydataが異なる場合のみ再レンダリングを行う。
   * @param {Object} prevProps 更新前のprops
   */
  componentDidUpdate(prevProps: Object) {
    if (prevProps.chartData !== this.props.chartData) {
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
