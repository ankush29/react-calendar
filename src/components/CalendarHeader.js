import React from "react";
import {data} from "../../src/config";

export default class CalendarHeader extends React.Component {

  state = {
    yearList: []
  };

  prevYearRange = () => {
    let yearList = this.state.yearList.map((item) => item - 9)
    this.setState({yearList})
  }

  setYear(year) {
    const month = (this.props.currentMonth).getMonth();
    let months = this.renderMonths();
    this.props.setDate(new Date(year, month, 1), months)
    this.setState({
      yearList: []
    })
  }

  nextYearRange = () => {
    let yearList = this.state.yearList.map((item) => item + 9)
    this.setState({yearList})
  }


  getMonths = () => {
    let months = this.renderMonths();
    this.props.setDate(this.props.currentMonth, months)
    this.setState({
      yearList: [],
    })
  }

  renderMonths = () => {
    if(!this.props.monthList.length) {
      return Object.keys(data.months).map((item, index) => {
        return (<div className="col" key={index} onClick={() => {this.setMonth(item)}}>{data.months[item]}</div>)
      })
    }
  }

  setMonth = (month) => {
    let year = (this.props.currentMonth).getFullYear();
    this.props.setDate(new Date(year, month, 1), [])
  }

  headerType() {
    const yearRangeLength = this.state.yearList.length
    return(
      <React.Fragment>
        {this.state.yearList.length ? <div className="year-col"> {this.state.yearList[0]+'-'+this.state.yearList[yearRangeLength-1]} </div> :
          (<React.Fragment> <div className="col col-start">
            {this.props.monthList.length ? null : <div className="icon" onClick={this.prevMonth}>
              chevron_left
            </div>}
          </div>
          <div className="col col-center">
            {this.props.monthList.length
              ? <span onClick={() => {this.getYear()}}>
                {(this.props.currentMonth).getFullYear()}
              </span>
              : <span onClick={() => {this.getMonths()}}>
                {data.months[(this.props.currentMonth).getMonth()] + ' ' + (this.props.currentMonth).getFullYear()}
              </span>
            }
          </div>
          {this.props.monthList.length ? null : <div className="col col-end">
            <div className="icon" onClick={this.nextMonth}>chevron_right</div>
          </div>}</React.Fragment>)
        }
      </React.Fragment>
    )
  }

  prevMonth = () => {
    const { monthList, currentMonth } = this.props;
    this.props.setDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1), monthList)
  };

  nextMonth = () => {
    const { monthList, currentMonth } = this.props;
    this.props.setDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1), monthList)
  };

  getYear = () => {
    const { currentMonth } = this.props;
    const currentYear = currentMonth.getFullYear();
    let years = [];
    if(!this.state.yearList.length) {
      for(let i = currentYear-4; i <= currentYear+4; i++) {
        years.push(i)
      }
    }
    this.setState({
      yearList: [...years],
    })
    this.props.setDate(currentMonth, [])
  }

  render() {
    return (
      <div className="header row flex-middle">
        {this.headerType()}
        <div className="row month">{this.props.monthList}</div>
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
}
