import React, { Component } from "react";
import InteractiveMap from "./InteractiveMap";
import "./LoginPage.css";

export default class LogInPage extends Component {
  	constructor(props){
		super(props);
		this.state = { isActive: false,
		username: "", password: ""};
		this.handleClick = this.handleClick.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleClick() {
	    sessionStorage.setItem("owner", "Nollkit");
		this.props.onDisplayChange(InteractiveMap);
	}

	//Kolla console log F12

	handleLogin() {
		if(this.state.username === "mottagningskommitten" && 
		this.state.password === "password"){
			console.log(this.state);
			this.props.onDisplayChange(InteractiveMap); 
		}
		else{
			console.log("Fel");
		}
	}

	render(){
		return(
			<div>
				{/*<button 
					className="marker-btn"
					onClick={this.handleClick}>
					<img src="redButton.png" alt="Premise button" />
				</button>
				*/}

				<div className="username-box">
						<label for="username">Username:</label>
						<input type="text" id="username" name="login" 
						onChange={e=>this.setState({username:e.target.value})} className="input-box"/><br/><br/>
						<label for="password">Password:</label>
						<input type="password" id="password" name="login" 
						onChange={e=>this.setState({password:e.target.value})}className="input-box"/><br/><br/>
						<button onClick={this.handleLogin}> Submit </button> 
				</div>


			</div>

		);
    }



}