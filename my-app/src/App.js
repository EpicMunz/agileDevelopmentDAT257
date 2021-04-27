import "./App.css";
import MenuHeader from "./components/MenuHeader";
import Schedule from "./components/Schedule";
import LogInPage from "./components/LogInPage";
import React, { Component } from "react";

//This is the file for App Component. App Component is the main component in React which acts as a container for all other components.

export default class App extends Component {
  state = { page: null, location: null };

  //updates the current page state
  displayChangePage = (nextPage) => {
    this.setState({
      page: nextPage,
    });
  };
  //updates the current chosen location and then changes the page to the schedule
  changeLocation = (newLocation) => {
    this.setState({
      location: newLocation,
    });
    this.displayChangePage(Schedule);
  };

  render() {
    const CurrentPage = this.state.page || LogInPage;
    return (
      <div>
        {CurrentPage !== LogInPage && (
          <MenuHeader onDisplayChange={this.displayChangePage} />
        )}
        <CurrentPage
          onDisplayChange={this.displayChangePage}
          onLocationChange={this.changeLocation}
          location={this.state.location}
        />
      </div>
    );
  }
}
