/**
 * @flow
 */

import React, { Component } from "react";

type Props = {
  datetime: Date,
  weight: number,
  bmi: number,
  bpf: number,
  mm: number,
  isVisible: Boolean,
  isCreate: Boolean,
  onAction: Function,
};
type State = {};

export class Dialog extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  static defaultProps = {
    isVisible: false,
    isCreate: false,
    onAction: () => {},
  };

  // When Dialog was closed, remove gray style.
  componentWillUnmount() {
    document.body ? document.body.classList.remove("dialogModalOpen") : null;
  }

  // When open Dialog on modal, add gray style to body.
  componentDidMount() {
    if (this.props.isVisible) {
      document.body ? document.body.classList.add("dialogModalOpen") : null;
    }
    // When user keydown 'Esc', close Dialog.
    document.onkeydown = (e) => {
      if (e.keyCode === 27) {
        this.props.onAction("close");
      }
    };
  }

  render() {
    return (
      <div className="dialog-wrapper">
        <div className="dialog-container">
          <form action="POST">
            <input type="datetime-local"></input>
            <input type="number" step="0.1" name="weight"></input>
            <input type="number" step="0.1" name="bmi"></input>
            <input type="number" step="0.1" name="bpf"></input>
            <input type="number" step="0.1" name="mm"></input>
            <input type="submit" value="submit"></input>
          </form>
        </div>
      </div>
    );
  }
}
