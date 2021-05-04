import React, { Component } from "react";
import InteractiveMap from "./map/InteractiveMap";
import "./LoginPage.css";
import {fetchData} from "./ClientFetch";

export default class LogInPage extends Component {
  	constructor(props){
		super(props);
		this.state = { isActive: false,
		username: "", password: ""};
		this.handleLogin = this.handleLogin.bind(this);
	}

   //checks if username and password was correct, if yes then switch to map screen
	async handleLogin() {
		if(await this.getData()){
			this.props.onDisplayChange(InteractiveMap); 
		}
		else{
			alert("Wrong Username or Password!");
		}
	}
	//Asks server for userdata related to the username and password combination
	async getData(){
          var data = [{
              Username: this.state.username,
              Password: this.state.password
          }];
          var receivedData = await fetchData("/logInUser", data);
          var jsonData = await receivedData.json();
          if(jsonData != null && jsonData.Username != null){
            sessionStorage.setItem("userData", JSON.stringify(jsonData));
            return true;
          }
          return false;
      }

	render(){
		return(
			<div>
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