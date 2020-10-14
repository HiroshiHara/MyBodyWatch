/**
 * @flow
 */

import React, { Component } from "react";

type Props = {
  title: string, // ボタンタイトル
  handleClick: Function, // onClickイベントハンドラ
};
type State = {};

/**
 * Buttonコンポーネント。<br>
 * ボタンタイトルとonClickイベントハンドラを設定可能。
 */
export class Button extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className="button-wrapper">
        <button onClick={this.props.handleClick}>{this.props.title}</button>
      </div>
    );
  }
}
