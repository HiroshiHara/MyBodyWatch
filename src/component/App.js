/**
 * @flow
 */

import React, { Component } from "react";
import { Header } from "./Header";
import { Chart } from "./Chart";
import { Button } from "./Button";
import { Dialog } from "./Dialog";

type Props = { initData: Object };
type State = { isDialogOpen: Boolean };

export class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isDialogOpen: false,
    };
  }

  render() {
    return (
      <div className="main-wrapper">
        <Header />
        <Button title="ADD" handleClick={() => alert("add")} />
        <Chart initData={this.props.initData} />
        {this.state.isDialogOpen ? <Dialog /> : null}
      </div>
    );
  }
}
