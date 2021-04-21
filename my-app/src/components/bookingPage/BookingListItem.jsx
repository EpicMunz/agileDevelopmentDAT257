import React, { Component}from "react";
import { Divider } from "antd";

class BookingListItem extends Component {
  state = {};
  render() {
    return (
      <React.Fragment // A really simple listitem that displays the events name, date and time as a row...
      >
        <div className="row" >
          <div className="col">{this.props.eventName}</div>
          <div className="col">{this.props.date}</div>
          <div className="col">{this.props.time}</div>
        </div>
        <Divider //... and adds a thin line below it 
        />
      </React.Fragment>
    );
  }
}

export default BookingListItem;
