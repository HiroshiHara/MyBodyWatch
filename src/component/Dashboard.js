/**
 * @flow
 */

import React, { Component } from "react";
import { Button } from "./Button";

type Props = { addButtonHandler: Function };

type State = {};

export class Dashboard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className="dashboard-wrapper">
        <div className="dashboard-container">
          <Button
            title="ADD"
            handleClick={this.props.addButtonHandler.bind(this)}
          />
        </div>
      </div>
    );
  }
}
