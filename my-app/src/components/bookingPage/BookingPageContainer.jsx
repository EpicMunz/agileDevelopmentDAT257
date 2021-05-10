import React, { Component } from "react";
import "./BookingPageContainer.css";
import { fetchData } from "../clientFetch/ClientFetch";
import Schedule from "../schedule/Schedule.jsx";

//Structure: BookingPageContainer -> BookingPane -> BookingListItem
export default class BookingPageContainer extends Component {

  constructor(props){
  		super(props);
  		this.state = { data: [], locations: []}
  		this.getData();
  	}
  //Adds a location the locations array

  componentWillReceiveProps(nextProps){
    this.getData();
  }
  //Requests my bookings data from server
  async getData() {
    var data = [
      {
        Owner: JSON.parse(sessionStorage.getItem("userData")).Username,
      },
    ];
    var receivedData = await fetchData("/getMyBookings", data);
    var jsonData = await receivedData.json();
    this.setState((state) => ({
      data: jsonData,
    }));
  }
  //returns a schedule component with linked props
  render() {
    return (<div>
                   <Schedule
                     onDisplayChange={this.displayChangePage}
                     onLocationChange={this.changeLocation}
                     data = {this.state.data}
                     updateParent = {this.getData.bind(this)}
                   />
                 </div>);
  }
}
