import React, { Component } from "react";
import { Divider } from "antd";
import BookingListItem from "./BookingListItem";
import datasource from "./dummy.json";

class BookingPane extends Component {
  state = { eventName: undefined, date:undefined, time:undefined}; 
  // the bookingPane only cares about the eventname (ex bollkalas), the date and the time

  componentDidMount(){
    this.getData(); //react black magic to get the data from json to work
  }
  
  getData = () =>{
    const x = datasource.nollkit.bookings[0];
    this.setState({eventName: x.evtname, date:x.d, time:x.t}); 
    // Above sets the fields (note: its equal to eventName = x.evtname, but this is good practice)
  }
  render() {
    
    return (
      <React.Fragment>
        <div className="row" style={{ fontWeight: "bold" }} //Adds three cols displaying the different fields for the table below it
        >
          <div className="col">Event</div>
          <div className="col">Datum</div>
          <div className="col">Tid</div>
        </div>
        <Divider />
        <BookingListItem //Currently adds a single hardcoded listitem, should be dynamic in the future, and feeds it the args
          eventName={this.state.eventName}
          date={this.state.date}
          time={this.state.time}
        />
      </React.Fragment>
    );
  }
}


export default BookingPane;
