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
import * as CONST from "../const/const.js";

type Props = {};
type State = {
  data: Object, //チャートに表示させるデータ
  isDialogOpen: boolean, // 現在ダイアログが開いているかどうか
  isCreate: boolean, // ダイアログが新規登録用か更新用かどうか
  tmpId: string, // 1件分のデータのIDの一時領域
  tmpDate: string, // 1件分のデータの年月の一時領域
  tmpWeight: number, // 1件分のデータの体重の一時領域
  tmpBmi: number, // 1件分のデータのBMIの一時領域
  tmpBfp: number, // 1件分のデータの体脂肪率の一時領域
  tmpMm: number, // 1件分のデータの筋肉率の一時領域
  tmpKcal: number, // 1件分のデータの基礎代謝の一時領域
  currentYearMonth: string, // 現在のチャートの年月
};

// -- global variables -------------------------------------
/**
 * ログイン中のユーザを格納する変数。
 */
let user = null;

/**
 * this.state.tmpDateのデフォルト値。
 */
const defaultDateState = dateformat("yyyy-mm-dd HH:MM");

/**
 * this.state.currentYearMonthのデフォルト値。(yyyy-mm)
 */
const defaultCurrentYM = defaultDateState.slice(0, 7);
// ---------------------------------------------------------

/**
 * トップレベルのコンポーネント。
 */
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
      currentYearMonth: defaultCurrentYM,
    };
  }

  /**
   * bodydataのドキュメントをkey:Array形式のオブジェクトに加工する。
   * @param {Object} bodydataDocs bodydataのドキュメント
   */
  chartDataProcessor(bodydataDocs: Object) {
    const result = {
      _id: [],
      weight: [],
      bmi: [],
      bfp: [],
      mm: [],
      kcal: [],
      date: [],
    };
    for (let i = 0; i < bodydataDocs.length; i++) {
      result._id[i] = bodydataDocs[i]._id;
      result.weight[i] = bodydataDocs[i].weight;
      result.bmi[i] = bodydataDocs[i].bmi;
      result.bfp[i] = bodydataDocs[i].bfp;
      result.mm[i] = bodydataDocs[i].mm;
      result.kcal[i] = bodydataDocs[i].kcal;
      const formatDate = dateformat(bodydataDocs[i].date, "yyyy-mm-dd HH:MM");
      result.date[i] = formatDate;
    }
    return result;
  }

  /**
   * ダイアログを閉じたときにコールされ、各種stateの値をデフォルトに戻す。
   */
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

  /**
   * 「ADD」ボタン押下時にコールされる関数。
   */
  onClickAddButtonHandler() {
    this.setState({
      isDialogOpen: true,
      isCreate: true,
    });
  }

  /**
   * チャート上の任意のデータをクリックしたときにコールされ、
   * そのデータをデフォルト値として更新ダイアログを表示する。
   * @param {string} _id bodydata1件分のID
   * @param {string} date _idに紐づく日付
   * @param {number} weight _idに紐づく体重
   * @param {number} bmi _idに紐づくBMI
   * @param {number} bpf _idに紐づく体脂肪率
   * @param {number} mm _idに紐づく筋肉量
   * @param {number} kcal _idに紐づく基礎代謝
   */
  onClickChartHandler(
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

  /**
   * ダイアログのボタンいずれかを押下したときにコールされ、押下したボタンによって処理が分岐する。<br>
   * <ul>
   *    <li>CANCELボタン... {@link App#closeDialog()}を実行する
   *    <li>ADDボタン... 1件のbodydataドキュメントを登録する
   *    <li>UPDATEボタン... 1件のbodydataドキュメントを更新する
   * </ul>
   * @param {Event} e イベント
   * @param {string} action "cancel" | "create" | "update"
   */
  onClickDialogButtonHandler(e: Event, action: string) {
    // --------------------------
    // case CANCEL
    // closeDialog()をコール。
    // --------------------------
    if (action === CONST.CANCEL) {
      this.closeDialog();
      return;
    }
    // --------------------------
    // case CREATE
    // 1. データのバリデーションチェックを行う。
    // 2. /createへPOST
    // --------------------------
    if (action === CONST.CREATE) {
      if (!checkCreateData(user._id, this.state)) {
        window.alert("Submit data is invalid.");
        return;
      }
      axios
        .post(CONST.CREATE, {
          userid: user._id,
          weight: this.state.tmpWeight,
          date: this.state.tmpDate,
          bmi: this.state.tmpBmi,
          bfp: this.state.tmpBfp,
          mm: this.state.tmpMm,
          kcal: this.state.tmpKcal,
        })
        .then((res) => {
          if (res.data.errcd === 1) {
            window.alert("The date is duplicated with existing date.");
          }
          this.closeDialog();
          this.loadChart(this.state.currentYearMonth);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    // --------------------------
    // case UPDATE
    // 1. データのバリデーションチェックを行う。
    // 2. /updateへPOST
    // --------------------------
    if (action === CONST.UPDATE) {
      if (!checkUpdateData(user._id, this.state)) {
        window.alert("Submit data is invalid.");
        return;
      }
      axios
        .post(CONST.UPDATE, {
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
          this.loadChart(this.state.currentYearMonth);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  /**
   * ダイアログ内の入力項目が変更されたときコールされ、this.stateの値を都度更新する。
   * @param {Event<HTMLInputElement>} e イベント
   * @param {string}} item どの入力項目かを判別する文字列
   */
  handleChange(e: Event<HTMLInputElement>, item: string) {
    if (item === CONST.WEIGHT_FIELDNAME) {
      this.setState({
        tmpWeight: e.target.value,
        tmpBmi: calcBmi(user.height, e.target.value),
        tmpMm: calcMm(e.target.value, this.state.tmpBfp),
        tmpKcal: calcKcal(user.height, e.target.value, user.age, user.sex),
      });
    }
    if (item === CONST.DATE_FIELDNAME) {
      this.setState({
        tmpDate: e.target.value,
      });
    }
    if (item === CONST.BMI_FIELDNAME) {
      this.setState({
        tmpBmi: e.target.value,
      });
    }
    if (item === CONST.BFP_FIELDNAME) {
      this.setState({
        tmpBfp: e.target.value,
        tmpMm: calcMm(this.state.tmpWeight, e.target.value),
      });
    }
    if (item === CONST.MM_FIELDNAME) {
      this.setState({
        tmpMm: e.target.value,
      });
    }
    if (item === CONST.KCAL_FIELDNAME) {
      this.setState({
        tmpKcal: e.target.value,
      });
    }
  }

  /**
   * チャート左右のアイコンをクリックしたときにコールされる。<br>
   * 左側のアイコンであれば前月データを検索し、右側であれば翌月データを検索する。
   * @param {number} direction -1であれば前月データをクリック、1であれば翌月データをクリック
   */
  onClickAngleHandler(direction: number) {
    const current = new Date(this.state.currentYearMonth);
    if (direction === CONST.SEARCH_KEY_PREVIOUS) {
      current.setMonth(current.getMonth() - 1);
      const previous = dateformat(current, "yyyy-mm");
      this.setState({
        currentYearMonth: previous,
      });
      this.loadChart(previous);
      return;
    }
    if (direction === CONST.SEARCH_KEY_NEXT) {
      current.setMonth(current.getMonth() + 1);
      const next = dateformat(current, "yyyy-mm");
      this.setState({
        currentYearMonth: next,
      });
      this.loadChart(next);
      return;
    }
  }

  /**
   * このコンポーネントがマウントされたときにコールされる。
   * ユーザIDをキーに、グローバル変数userを初期化する。
   * その後、チャート用データを読み込む。
   */
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
        this.loadChart(defaultCurrentYM);
      })
      .catch((err) => {
        console.error(err);
      });

    // Escキー押下時にダイアログを閉じるようイベントハンドラを設定
    document.onkeydown = (e) => {
      if (e.keyCode === 27) {
        this.closeDialog();
      }
    };

    // ダイアログの外側をクリックしたときにダイアログを閉じるようイベントハンドラを設定
    const overlayDivElem = document.getElementById("dialog-overlay");
    overlayDivElem.addEventListener("click", (e) => {
      e.stopPropagation();
      this.closeDialog();
    });
  }

  /**
   * YYYY-MM形式の年月文字列をキーに、その年月分のbodydataドキュメントを取得する。
   * @param {string} yearMonth YYYY-MM形式の年月文字列
   */
  loadChart(yearMonth: string) {
    let result = null;
    axios
      .get("/load", {
        params: {
          _id: user._id,
          date: yearMonth,
        },
      })
      .then((res) => {
        result = this.chartDataProcessor(res.data);
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
        <div className="header-space"></div>
        <div id="dialog-overlay"></div>
        <div className="main-wrapper">
          <Button
            title="ADD"
            handleClick={this.onClickAddButtonHandler.bind(this)}
          />
          <Chart
            initData={this.state.data}
            currentYearMonth={this.state.currentYearMonth}
            onClickChart={this.onClickChartHandler.bind(this)}
            onClickAngleHandler={this.onClickAngleHandler.bind(this)}
          />
          {this.state.isDialogOpen ? (
            <Dialog
              isDialogOpen={true}
              isCreate={this.state.isCreate}
              onChange={this.handleChange.bind(this)}
              onCreate={this.onClickDialogButtonHandler.bind(this)}
              onCancel={this.onClickDialogButtonHandler.bind(this)}
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
