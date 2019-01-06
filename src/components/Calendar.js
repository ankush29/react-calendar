import React from "react";
import {data} from "../../src/config"

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    monthList: [],
    yearList: []
  };

  componentDidMount() {
    if(this.props.location.search) {
      const selectedDate = decodeURI(this.props.location.search.split('=')[1])
      this.setState({
        currentMonth: new Date(selectedDate),
        selectedDate: new Date(selectedDate)
      })
    }
  }

  headerType() {
    const yearRangeLength = this.state.yearList.length
    return(
      <React.Fragment>
        {this.state.yearList.length ? <div className="year-col"> {this.state.yearList[0]+'-'+this.state.yearList[yearRangeLength-1]} </div> :
          (<React.Fragment> <div className="col col-start">
            {this.state.monthList.length ? null : <div className="icon" onClick={this.prevMonth}>
              chevron_left
            </div>}
          </div>
          <div className="col col-center">
            {this.state.monthList.length
              ? <span onClick={() => {this.getYear()}}>
                {(this.state.currentMonth).getFullYear()}
              </span>
              : <span onClick={() => {this.getMonths()}}>
                {data.months[(this.state.currentMonth).getMonth()] + ' ' + (this.state.currentMonth).getFullYear()}
              </span>
            }
          </div>
          {this.state.monthList.length ? null : <div className="col col-end">
            <div className="icon" onClick={this.nextMonth}>chevron_right</div>
          </div>}</React.Fragment>)
        }
      </React.Fragment>
    )
  }

  renderHeader() {
    return (
      <div className="header row flex-middle">
        {this.headerType()}
        <div className="row month">{this.state.monthList}</div>
        { this.state.yearList.length ? <div className="row icon-parent ">
          <div className="icon" onClick={this.prevYearRange}>
            chevron_left
          </div>
          {this.state.yearList.map((item, index) => {
            return(
              <div className="col" key={index} onClick={() => {this.setYear(item)}}>
                {item}
              </div>
            )
          })}
          <div className="icon right" onClick={this.nextYearRange}>
            chevron_right
          </div>
        </div> : null }
      </div>
    );
  }

  renderDays() {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {data.week[i]}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
    const currentStartDay = monthStart.getDay();
    const currentEndDay = monthEnd.getDay();
    let startDate = monthStart;
    let endDate = monthEnd;
    if(currentStartDay !== 0) {
      const overFlowPrevDate = new Date(monthStart.getFullYear(), monthStart.getMonth(), 0).getDate() - currentStartDay + 1;
      const overFlowPrevMonth = new Date(monthStart.getFullYear(), monthStart.getMonth(), 0).getMonth();
      const overFlowPrevYear = new Date(monthStart.getFullYear(), monthStart.getMonth(), 0).getFullYear();
      startDate = new Date(overFlowPrevYear, overFlowPrevMonth, overFlowPrevDate)
    }
    if(currentEndDay !== 6) {
      const overFlowNextDate = new Date(monthEnd.getFullYear(), monthEnd.getMonth()+1, 1).getDate() + 6 - currentEndDay - 1;
      const overFlowNextMonth = new Date(monthEnd.getFullYear(), monthEnd.getMonth()+1, 1).getMonth();
      const overFlowNextYear = new Date(monthEnd.getFullYear(), monthEnd.getMonth()+1, 1).getFullYear();
      endDate = new Date(overFlowNextYear, overFlowNextMonth, overFlowNextDate)
    }
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = day.getDate();
        const cloneDay = new Date(day.getTime());
        days.push(
          <div
            className={`col cell ${
              day.getMonth() !== monthStart.getMonth()
                ? "disabled"
                : day.toDateString() ===  selectedDate.toDateString() ? "selected" : ""
            }`}
            key={day} value={cloneDay}
            onClick={() => this.onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
          </div>
        );
        day.setDate(day.getDate() + 1)
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    const { history } = this.props;
    this.setState({
      selectedDate: day
    });
    history.push({
      search: `?date=${day}`
    })
  };

  nextMonth = () => {
    const { currentMonth } = this.state;
    this.setState({
      currentMonth: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    });
  };

  prevMonth = () => {
    const { currentMonth } = this.state;
    this.setState({
      currentMonth: new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    });
  };

  renderMonths() {
    if(!this.state.monthList.length) {
      return Object.keys(data.months).map((item, index) => {
        return (<div className="col" key={index} onClick={() => {this.setMonth(item)}}>{data.months[item]}</div>)
      })
    }
  }

  getMonths = () => {
    let months = this.renderMonths();
    this.setState({
      monthList: [...months],
      yearList: []
    })
  }

  setMonth = (month) => {
    let year = (this.state.currentMonth).getFullYear();
    this.setState({
      currentMonth: new Date(year, month, 1),
      monthList: []
    })
  }

  getYear = () => {
    const currentYear = (this.state.currentMonth).getFullYear();
    let years = [];
    if(!this.state.yearList.length) {
      for(let i = currentYear-4; i <= currentYear+4; i++) {
        years.push(i)
      }
    }
    this.setState({
      yearList: [...years],
      monthList: []
    })
  }

  prevYearRange = () => {
    let yearList = this.state.yearList.map((item) => item - 9)
    this.setState({yearList})
  }

  nextYearRange = () => {
    let yearList = this.state.yearList.map((item) => item + 9)
    this.setState({yearList})
  }

  setYear(year) {
    const month = (this.state.currentMonth).getMonth();
    let months = this.renderMonths();
    this.setState({
      currentMonth: new Date(year, month, 1),
      monthList: [...months],
      yearList: []
    })
  }

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

export default Calendar;
