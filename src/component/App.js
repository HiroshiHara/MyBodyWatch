/**
 * @flow
 */

import React, { Component } from "react";
import { Header } from "./Header";
import { Chart } from "./Chart";

type Props = { initData: Object };
type State = {};

export class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className="main-wrapper">
        <Header />
        <Chart initData={this.props.initData} />
      </div>
    );
  }
}
