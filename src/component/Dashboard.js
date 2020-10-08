/**
 * @flow
 */

import React, { Component } from "react";
import { Button } from "./Button";
import { Selector } from "./Selector";

type Props = {};

type State = {};

export class Dashboard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className="dashboard-wrapper">
        <div className="dashboard-container">
          <Button />
          <Selector />
        </div>
      </div>
    );
  }
}
