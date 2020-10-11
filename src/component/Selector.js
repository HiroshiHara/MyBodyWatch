/**
 * @flow
 */

import React, { Component } from "react";

type Props = {};

type State = {};

export class Selector extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className="selector-wrapper">
        <div className="selector-container">
          <span>{String.fromCodePoint(9664)}</span>
          <span>{String.fromCodePoint(9654)}</span>
        </div>
      </div>
    );
  }
}
