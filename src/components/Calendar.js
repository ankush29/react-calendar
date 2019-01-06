import React from "react";
import CalendarHeader from "./CalendarHeader.js"
import WeekDays from "./WeekDays.js"
import DateCells from "./DateCells.js"

export default class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    monthList: [],
  };

  setDate = (date, months) => {
    this.setState({
      currentMonth: date,
      monthList: [...months]
    })
  }

  render() {
    const { monthList, currentMonth } = this.state;
    return (
      <div className="calendar">
        <CalendarHeader monthList={monthList} currentMonth={currentMonth} setDate={this.setDate}/>
        <WeekDays />
        <DateCells currentMonth={currentMonth} location={this.props.location} history={this.props.history} setDate={this.setDate}/>
      </div>
    );
  }
}
