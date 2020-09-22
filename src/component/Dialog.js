/**
 * @flow
 */

import React, { Component } from "react";

type Props = {
  datetime: ?Date,
  weight: ?number,
  bmi: ?number,
  bpf: ?number,
  mm: ?number,
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
    return (
      <div className="dialog-wrapper">
        <div className="dialog-container">
          {/* <form> */}
          <label>Date:</label>
          <input
            type="datetime-local"
            onChange={(e) => this.props.onChange(e, "date")}
          ></input>
          <br />
          <label>Weight:</label>
          <input
            type="number"
            step="0.1"
            name="weight"
            onChange={(e) => this.props.onChange(e, "weight")}
          ></input>
          <br />
          <label>BMI:</label>
          <input
            type="number"
            step="0.1"
            name="bmi"
            onChange={(e) => this.props.onChange(e, "bmi")}
          ></input>
          <br />
          <label>BPF:</label>
          <input
            type="number"
            step="0.1"
            name="bpf"
            onChange={(e) => this.props.onChange(e, "bpf")}
          ></input>
          <br />
          <label>MM:</label>
          <input
            type="number"
            step="0.1"
            name="mm"
            onChange={(e) => this.props.onChange(e, "mm")}
          ></input>
          <br />
          <label>kcal:</label>
          <input
            type="number"
            step="1"
            name="kcal"
            onChange={(e) => this.props.onChange(e, "kcal")}
          ></input>
          <br />
          <div className="dialog-button">
            <input
              type="submit"
              value={submitTitle}
              onClick={(e) => this.props.onCreate(e, "create")}
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
