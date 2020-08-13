/**
 * @flow
 */

import React, { Component } from "react";
import { Logo } from "./Logo";
import { HeaderItem } from "./HeaderItem";

type Props = {};
type State = {};

export class Header extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className="header-wrapper">
        <div className="logo-container">
          <Logo />
        </div>
        <div className="headerItem-container">
          <HeaderItem title="Blog" dist="google.com" />
          <HeaderItem title="MyBodyWatch" dist="#" />
          <HeaderItem title="Profile" dist="#" />
        </div>
      </div>
    );
  }
}
