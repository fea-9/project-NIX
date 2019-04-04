import React, { Component } from "react";
import Calendar from "react-calendar/dist/entry.nostyle";

import "./Calendar.scss";

class Calend extends Component {
  state = {
    initialDate: new Date(),
    startRange: "",
    endRange: ""
  };

  onChange = date =>
    this.setState({
      startRange: this.formatDate(date[0], "mm/dd/yyyy"),
      endRange: this.formatDate(date[1], "mm/dd/yyyy")
    });

  formatDate = (date, format) => {
    return format === "dd"
      ? date
          .toString()
          .split(" ")[0]
          .slice(0, 2)
      : format === "MMM"
      ? date
          .toString()
          .split(" ")
          .filter((item, index) => index === 1 || index === 3)
          .map((item, index) => (index === 0 ? item.toUpperCase() : item))
          .join(" ")
      : format === "mm/dd/yyyy"
      ? [date.getMonth() + 1, date.getDate(), date.getFullYear()].join("/")
      : '';
  };

  render() {
    return (
      <div className="calendar-wrapper">
        <div className="calendar-wrapper__inputs-block">
          <input
            className="calendar-wrapper__inputs-block__input"
            type="text"
            name="startRange"
            placeholder="06/11/2018"
            value={this.state.startRange}
          />
          <input
            className="calendar-wrapper__inputs-block__input"
            type="text"
            name="endRange"
            placeholder="06/14/2018"
            value={this.state.endRange}
          />
        </div>
        <Calendar
          onChange={this.onChange}
          selectRange={true}
          formatShortWeekday={(locale, date) => this.formatDate(date, "dd")}
          formatMonthYear={(locale, date) => this.formatDate(date, "MMM")}
          minDetail="month"
          next2Label={null}
          prev2Label={null}
          showNeighboringMonth={false}
          activeStartDate={this.state.initialDate}
        />
      </div>
    );
  }
}

export default Calend;
