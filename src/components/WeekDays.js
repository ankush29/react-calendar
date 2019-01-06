import React from 'react';
import {data} from "../../src/config";

export default class WeekDays extends React.Component {
  render() {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {data.week[i]}
        </div>
      );
    }
    return(
      <div className="days row">{days}</div>
    );
  }
};
