import "./App.css";
import MenuHeader from "./components/header/MenuHeader";
import Schedule from "./components/schedule/Schedule.jsx";
import LogInPage from "./components/logInPage/LogInPage";
import ForgotPassword from "./components/logInPage/ForgotPassword";
import React, { Component } from "react";
import InteractiveMap from "./components/map/InteractiveMap";
import BookingPageContainer from "./components/bookingPage/BookingPageContainer.jsx";
import AvailableLocations from "./components/availableLocations/AvailableLocations.jsx";
import AddAccountPage from "./components/adminAccountPage/AccountPage.jsx";
import ManageProfilePage from "./components/profilePage/ManageProfilePage.jsx";
import PdfrPage from "./components/pdfReader/PdfrPage.jsx";

//Constant for checking string against component
export const components = {
      InteractiveMap: InteractiveMap,
      Schedule: Schedule,
      BookingPageContainer: BookingPageContainer,
      AvailableLocations: AvailableLocations,
      AddAccountPage: AddAccountPage,
      ManageProfilePage: ManageProfilePage,
      PdfrPage: PdfrPage,

  };
//This is the file for App Component. App Component is the main component in React which acts as a container for all other components.

export default class App extends Component {

  state = { page: null, location: null };

  //when component mounts set stage page from localStorage
  componentDidMount() {
      if(localStorage.getItem("page") != null){
              this.setState({page: components[JSON.parse(sessionStorage.getItem("page"))]});

      }
      if(localStorage.getItem("location") != null){
            this.setState({location: JSON.parse(sessionStorage.getItem("location"))});
      }
  }
  //updates the current page state
  displayChangePage = (nextPage) => {
    if(nextPage.name === "App"){
        sessionStorage.setItem("page", JSON.stringify("Schedule"));
    }
    else if(nextPage.name === "LogInPage"){
        sessionStorage.removeItem("page");
    }
    else {
            sessionStorage.setItem("page", JSON.stringify(nextPage.name));
        }
    this.setState({
      page: nextPage,
    });
  };
  //updates the current chosen location and then changes the page to the schedule
  changeLocation = (newLocation) => {
    this.setState({
      location: newLocation,
    });
    sessionStorage.setItem("location", JSON.stringify(newLocation));
    this.displayChangePage(Schedule);
  };

  render() {
    var CurrentPage = this.state.page || LogInPage;
    return (
      <div>
        {(CurrentPage !== ForgotPassword && CurrentPage !== LogInPage) && (
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
