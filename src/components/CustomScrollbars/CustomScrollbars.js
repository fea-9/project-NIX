import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
export default class CustomScrollbars extends Component {
    render() {
      return (
        <Scrollbars
          renderTrackHorizontal={props => <div {...props} className="tr-horizontal"/>}
          renderTrackVertical={props => <div {...props} className="tr-vertical"/>}
          renderThumbHorizontal={props => <div {...props} className="th-horizontal"/>}
        >
          {this.props.children}
        </Scrollbars>
      );
    }
  }