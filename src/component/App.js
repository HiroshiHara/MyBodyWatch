/**
 * @flow
 */

import React, { Component } from "react";
import { Header } from "./Header";

type Props = {};
type State = {};
const HEADER = <Header />;

export class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return <div className="main-wrapper">{HEADER}</div>;
  }
}
