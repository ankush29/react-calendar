import React, { Component } from 'react';
import Calendar from "./components/Calendar";
import './index.css';
import { BrowserRouter as Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <div id="logo">
            <span className="icon">date_range</span>
            <span>
              calendar
            </span>
          </div>
        </header>
        <main>
          <Switch>
            <Route exact path='/' component={Calendar} />
          </Switch>
       </main>
      </div>
    );
  }
}

export default App;
