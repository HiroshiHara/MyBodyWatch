/**
 * @flow
 */

import React, { Component } from "react";

type Props = {};
type State = {};

export class Logo extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className="logo-wrapper">
        <span className="logo-text">
          MyBody<span>W</span>atch
        </span>
      </div>
    );
  }
}
