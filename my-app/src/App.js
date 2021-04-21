import "./App.css";
import InteractiveMap from "./components/InteractiveMap";
import MenuHeader from "./components/MenuHeader";
import Schedule from "./components/Schedule";
import LogInPage from "./components/LogInPage";
import React, { Component } from "react";

//This is the file for App Component. App Component is the main component in React which acts as a container for all other components.

class App extends Component{
	constructor(props){
		super(props); //loginpage --> header, logInPage
		this.state = { logInActive: true};
		this.displayLogInPage = this.displayLogInPage.bind(this);
	}

	displayLogInPage(){
		this.setState(state => ({
			logInActive: !state.logInActive
		}));
	}

	/*
	Switch case mellan states. 
	*/
	render() {

		return ( 
			
				this.state.logInActive ?
				<div>
					<MenuHeader/>
					<LogInPage
						onDisplayChange = {this.displayLogInPage}
						isActive = {this.state.isActive}
					/>
				</div> 
				:
				<div>
					<MenuHeader/>
					<Schedule/>
				</div>




		);

	}
}



export default App;