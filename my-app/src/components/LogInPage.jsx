import React, { Component } from "react";
import InteractiveMap from "./InteractiveMap";

export default class LogInPage extends Component {
  	constructor(props){
		super(props);
		this.state = { isActive: false};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.onDisplayChange(InteractiveMap);
	}

	render(){
		return(
			<div>
				<button 
					className="marker-btn"
					onClick={this.handleClick}>
					<img src="redButton.png" alt="Premise button" />
				</button>
			</div>
		);
    }
}


