/**
 * @flow
 */

import React, { Component } from "react";

type Props = {
  title: string,
  dist: string,
};
type State = {};

export class HeaderItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className="headerItem-wrapper">
        <a className="headerItem-link" href={this.props.dist}>
          {this.props.title}
        </a>
      </div>
    );
  }
}
