import React, { Component } from "react";

export default class LogInPage extends Component {
  	constructor(props){
		super(props);
		this.state = { isActive: false};
		this.handleClick = this.handleClick.bind(this);
	}
  
	handleClick(e) {
		this.props.onDisplayChange(e.target.value);
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


