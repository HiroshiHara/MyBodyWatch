/**
 * @flow
 */

import React, { Component } from "react";
import { Header } from "./Header";
import { Chart } from "./Chart";

type Props = {};
type State = {};
const HEADER = <Header />;
const CHART = <Chart />;

export class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className="main-wrapper">
        {HEADER}
        {CHART}
      </div>
    );
  }
}
