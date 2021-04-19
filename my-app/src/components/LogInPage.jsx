import React, { Component } from "react";

export default class LogInPage extends Component {



    render(){
    var loggedIn = new Boolean(false);
        return(


            <button
                className="marker-btn"
                onClick={(e) => {
                  e.preventDefault();
                  loggedIn = true;
                }}
              >
                <img src="redButton.png" alt="Premise button" />
              </button>






        );

    }
}


