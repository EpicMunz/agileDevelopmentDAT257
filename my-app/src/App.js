import logo from "./logo.svg";
import "./App.css";
import InteractiveMap from "./components/InteractiveMap";
import MenuHeader from "./components/MenuHeader";
import Schedule from "./components/Schedule";
import LogInPage from "./components/LogInPage";
import React, { Component } from "react";
import BookingPage from "./components/bookingPage/BookingPageContainer";

//This is the file for App Component. App Component is the main component in React which acts as a container for all other components.

class App extends Component{
    constructor(props){
        super(props);
        this.state = { isLoggedIn: true};
}

render() {
var foo = Boolean(false);

//this.state.isLoggedIn = LogInPage.loggedIn;



    return ( this.state.isLoggedIn ?
     <div>
        <MenuHeader/>

        <BookingPage/>
      </div> :
       <div>
        <MenuHeader/>
        <LogInPage loginData={this.state.isLoggedIn}/>

       </div>


    );
}
}




/*
function App() {

  return ( this.state.isLoggedIn &&
    <div>
      <MenuHeader />
      <InteractiveMap />
      <Schedule />
    </div>
  );
}
*/

export default App;

