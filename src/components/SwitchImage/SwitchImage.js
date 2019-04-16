import React, { Component } from "react";

export default class SwitchImage extends Component {
  state = {
    error: false
  };
  errorChecker = () => {
    this.setState({ error: true });
  };
  render() {
    const { src, alt, className } = this.props;
    if (this.state.error) return alt;
    const testImage = new Image();
    testImage.onerror = () => {
      this.setState({ error: true });
      console.error(
        "Link download failed, image replaced with alternative component"
      );
    };
    testImage.src = src;
    return <img className={className} src={src} alt="lol" />;
  }
}
