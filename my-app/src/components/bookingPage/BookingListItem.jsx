import React, { Component}from "react";
import { Divider } from "antd";

class BookingListItem extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="row" >
          <div className="col">{this.props.eventName}</div>
          <div className="col">{this.props.date}</div>
          <div className="col">{this.props.time}</div>
        </div>
        <Divider />
      </React.Fragment>
    );
  }
}

export default BookingListItem;
