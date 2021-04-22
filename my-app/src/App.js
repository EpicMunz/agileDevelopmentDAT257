import "./App.css";
import MenuHeader from "./components/MenuHeader";
import Schedule from "./components/Schedule";
import LogInPage from "./components/LogInPage";
import React, { Component } from "react";

//This is the file for App Component. App Component is the main component in React which acts as a container for all other components.

class App extends Component{
	constructor(props){
		super(props);
		this.state = { page: null, location: null};
		this.displayChangePage = this.displayChangePage.bind(this);
		this.changeLocation = this.changeLocation.bind(this);
	}
    //updates the current page state
	displayChangePage(nextPage){
		this.setState(state => ({
			page: nextPage
		}));
	}
	//updates the current chosen location and then changes the page to the schedule
	changeLocation(newLocation){
	    this.setState(state => ({
            location: newLocation
        }));
        this.displayChangePage(Schedule);

	}

	render() {
    var CurrentPage = this.state.page || LogInPage;
		return (
				<div>
					<MenuHeader
					  onDisplayChange = {this.displayChangePage}

					/>
					<CurrentPage
					onDisplayChange = {this.displayChangePage}
					onLocationChange = {this.changeLocation}
					location = {this.state.location}

					/>
				</div>
		);
	}
}

export default App;