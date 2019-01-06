import React from 'react';

export default class DateCells extends React.Component {
  state = {
    selectedDate: new Date(),
  };

  componentDidMount() {
    if(this.props.location.search) {
      const selectedDate = decodeURI(this.props.location.search.split('=')[1])
      this.setState({
        selectedDate: new Date(selectedDate)
      })
      this.props.setDate(new Date(selectedDate), []);
    }
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

  render() {
    const { currentMonth } = this.props;
    const { selectedDate } = this.state;
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
};
