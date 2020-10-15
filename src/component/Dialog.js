/**
 * @flow
 */

import dateformat from "dateformat";
import React, { Component } from "react";

type Props = {
  _id: ?string, // bodydata._id, 新規登録時はnull。
  date: ?string, // bodydata.date, 新規登録時はnull。
  weight: ?number, // bodydata.weight, 新規登録時は0。
  bmi: ?number, // bodydata.bmi, 新規登録時は0。
  bfp: ?number, // bodydata.bfp, 新規登録時は0。
  mm: ?number, // bodydata.mm, 新規登録時は0。
  kcal: ?number, // bodydata.kcal, 新規登録時は0。
  isDialogOpen: boolean, // ダイアログが開いているかどうか
  isCreate: boolean, // ダイアログが新規登録用か更新用かどうか
  onChange: Function, // 入力項目のonChangeハンドラ
  onSubmit: Function, // ADDまたはUPDATEボタン押下時のハンドラ
  onCancel: Function, // CANCELボタン押下時のハンドラ
};
type State = {};

/**
 * Dialogコンポーネント。<br>
 * bodydataドキュメントを登録または更新を行う。
 */
export class Dialog extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  static defaultProps = {
    isDialogOpen: false,
    isCreate: false,
    onChange: () => {},
    onSubmit: () => {},
    onCancel: () => {},
  };

  // このコンポーネントが非表示になったときにオーバレイを外す
  componentWillUnmount() {
    const overlayDivElem = document.getElementById("dialog-overlay");
    overlayDivElem.removeAttribute("class", "dialog-overlay");
  }

  // このコンポーネントが表示されたときオーバレイを表示する
  componentDidMount() {
    if (this.props.isDialogOpen) {
      const overlayDivElem = document.getElementById("dialog-overlay");
      overlayDivElem.setAttribute("class", "dialog-overlay");
    }
  }

  render() {
    const submitTitle = this.props.isCreate ? "ADD" : "UPDATE";
    const submitAction = this.props.isCreate ? "create" : "update";
    const formatDate = dateformat(this.props.date, "yyyy-mm-dd");
    return (
      <div className="dialog-wrapper">
        <div className="dialog-container">
          <label>Date:</label>
          <input
            type="date"
            value={formatDate}
            onChange={(e) => this.props.onChange(e, "date")}
            readOnly={!this.props.isCreate}
          ></input>
          <br />
          <label>Weight:</label>
          <input
            type="number"
            value={this.props.weight !== 0 ? this.props.weight : ""}
            step="0.01"
            name="weight"
            onChange={(e) => this.props.onChange(e, "weight")}
          ></input>
          <br />
          <label>BMI:</label>
          <input
            type="number"
            value={this.props.bmi !== 0 ? this.props.bmi : ""}
            step="0.1"
            name="bmi"
            onChange={(e) => this.props.onChange(e, "bmi")}
            readOnly
          ></input>
          <br />
          <label>BFP:</label>
          <input
            type="number"
            value={this.props.bfp !== 0 ? this.props.bfp : ""}
            step="0.01"
            name="bfp"
            onChange={(e) => this.props.onChange(e, "bfp")}
          ></input>
          <br />
          <label>MM:</label>
          <input
            type="number"
            value={this.props.mm !== 0 ? this.props.mm : ""}
            step="0.1"
            name="mm"
            onChange={(e) => this.props.onChange(e, "mm")}
            readOnly
          ></input>
          <br />
          <label>kcal:</label>
          <input
            type="number"
            value={this.props.kcal !== 0 ? this.props.kcal : ""}
            step="1"
            name="kcal"
            onChange={(e) => this.props.onChange(e, "kcal")}
            readOnly
          ></input>
          <br />
          <input type="hidden" value={this.props._id} name="_id"></input>
          <div className="dialog-button">
            <input
              type="submit"
              value={submitTitle}
              onClick={(e) => this.props.onSubmit(e, submitAction)}
            ></input>
            <input
              type="button"
              value="CANCEL"
              onClick={(e) => this.props.onCancel(e, "cancel")}
            ></input>
          </div>
        </div>
      </div>
    );
  }
}
