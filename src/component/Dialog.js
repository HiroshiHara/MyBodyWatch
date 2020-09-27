/**
 * @flow
 */

import dateformat from "dateformat";
import React, { Component } from "react";

type Props = {
  _id: ?string,
  datetime: ?Date,
  weight: ?number,
  bmi: ?number,
  bfp: ?number,
  mm: ?number,
  kcal: ?Number,
  isDialogOpen: boolean,
  isCreate: boolean,
  onChange: Function,
  onCreate: Function,
  onCancel: Function,
};
type State = {};

export class Dialog extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  static defaultProps = {
    isVisible: false,
    isCreate: false,
    onChange: () => {},
    onCreate: () => {},
    onCancel: () => {},
  };

  // When Dialog was closed, remove gray style.
  componentWillUnmount() {
    document.body ? document.body.classList.remove("dialogModalOpen") : null;
  }

  // When open Dialog on modal, add gray style to body.
  componentDidMount() {
    if (this.props.isDialogOpen) {
      document.body ? document.body.classList.add("dialogModalOpen") : null;
    }
  }

  render() {
    const submitTitle = this.props.isCreate ? "ADD" : "UPDATE";
    const submitAction = this.props.isCreate ? "create" : "update";
    const formatDatetime = dateformat(
      this.props.datetime,
      "yyyy-mm-dd'T'HH:MM"
    );
    return (
      <div className="dialog-wrapper">
        <div className="dialog-container">
          {/* <form> */}
          <label>Date:</label>
          <input
            type="datetime-local"
            value={formatDatetime}
            onChange={(e) => this.props.onChange(e, "date")}
          ></input>
          <br />
          <label>Weight:</label>
          <input
            type="number"
            value={this.props.weight}
            step="0.1"
            name="weight"
            onChange={(e) => this.props.onChange(e, "weight")}
          ></input>
          <br />
          <label>BMI:</label>
          <input
            type="number"
            value={this.props.bmi}
            step="0.1"
            name="bmi"
            onChange={(e) => this.props.onChange(e, "bmi")}
          ></input>
          <br />
          <label>BFP:</label>
          <input
            type="number"
            value={this.props.bfp}
            step="0.1"
            name="bfp"
            onChange={(e) => this.props.onChange(e, "bfp")}
          ></input>
          <br />
          <label>MM:</label>
          <input
            type="number"
            value={this.props.mm}
            step="0.1"
            name="mm"
            onChange={(e) => this.props.onChange(e, "mm")}
          ></input>
          <br />
          <label>kcal:</label>
          <input
            type="number"
            value={this.props.kcal}
            step="1"
            name="kcal"
            onChange={(e) => this.props.onChange(e, "kcal")}
          ></input>
          <br />
          <input type="hidden" value={this.props._id} name="_id"></input>
          <div className="dialog-button">
            <input
              type="submit"
              value={submitTitle}
              onClick={(e) => this.props.onCreate(e, submitAction)}
            ></input>
            <input
              type="button"
              value="CANCEL"
              onClick={(e) => this.props.onCancel(e, "cancel")}
            ></input>
          </div>
          {/* </form> */}
        </div>
      </div>
    );
  }
}
