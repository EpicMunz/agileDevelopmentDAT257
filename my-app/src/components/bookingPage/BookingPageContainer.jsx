import React, { Component } from "react";
import "./BookingPageContainer.css";
import {fetchData} from "../clientFetch/ClientFetch";
import Schedule from "../schedule/Schedule.jsx";


//Structure: BookingPageContainer -> BookingPane -> BookingListItem
export default class BookingPageContainer extends Component {

  constructor(props){
  		super(props);
  		this.state = {location: null, data: [], locations: []}
  		this.locations = [];
  		this.handleClick = this.handleClick.bind(this);
  		this.getData();
  	}
  //Saves the new location in location state
  handleClick(newLocation){
    this.setState(state => ({
        location: newLocation
    }));
    this.locations = [];

  }
  //Adds a location the locations array
  addLocation(location){
    this.locations.push(location);
  }
  componentWillReceiveProps(nextProps){
    this.getData();
  }
  //Requests my bookings data from server
  async getData(){
      var data = [{
          Owner: JSON.parse(sessionStorage.getItem("userData")).Username
      }];
      var receivedData = await fetchData("/getMyBookings", data);
      var jsonData = await receivedData.json();
      this.setState(state => ({
              data: jsonData
      }));
  }
  //returns a schedule component with linked props
  render() {
    return (<div>
                   <Schedule
                     onDisplayChange={this.displayChangePage}
                     onLocationChange={this.changeLocation}
                     location= {this.state.location}
                     data = {this.state.data}
                   />
                 </div>);
  }
}
