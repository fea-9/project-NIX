import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
export default class CustomScrollbars extends Component {
    render() {
      const {right, autoHide} = this.props
      return (
        <Scrollbars
          autoHide={autoHide}
          renderTrackHorizontal={props => <div {...props} className={right ? "rg-horizontal" : "tr-horizontal"}/>}
          renderTrackVertical={props => <div {...props} className={right ? "rg-vertical" : "tr-vertical"}/>}
          renderThumbHorizontal={props => <div {...props} className={right ? "rg-horizontal" :"th-horizontal"}/>}
        >
          {this.props.children}
        </Scrollbars>
      );
    }
  }