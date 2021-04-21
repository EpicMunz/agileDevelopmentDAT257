import React, { Component } from "react";
import { Divider } from "antd";
import BookingListItem from "./BookingListItem";
import datasource from "./dummy.json";

class BookingPane extends Component {
  state = { eventName: undefined, date:undefined, time:undefined};

  componentDidMount(){
    this.getData();
  }
  
  getData = () =>{
    const x = datasource.nollkit.bookings[0];
    this.setState({eventName: x.evtname, date:x.d, time:x.t});
  }
  render() {
    
    return (
      <React.Fragment>
        <div className="row" style={{ fontWeight: "bold" }}>
          <div className="col">Event</div>
          <div className="col">Datum</div>
          <div className="col">Tid</div>
        </div>
        <Divider />
        <BookingListItem
          eventName={this.state.eventName}
          date={this.state.date}
          time={this.state.time}
        />
      </React.Fragment>
    );
  }
}


export default BookingPane;