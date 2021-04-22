import React, { Component}from "react";
import { Divider } from "antd";

class BookingListItem extends Component {
  state = {};

  formatDate(number){

    if(number < 10){
      number = "0" + number;
    }

    return(number);

  }

  render() {

    var bookDate = new Date(this.props.startTime);
    var endTime = new Date(this.props.endTime);
    bookDate.setMonth(bookDate.getMonth()+1);

    return (
      <React.Fragment // A really simple listitem that displays the events name, date and time as a row...
      >
        <div className="row" >
          <div className="col">{this.props.eventName}</div>
          <div className="col">{bookDate.getFullYear() + "-" + 
                                this.formatDate(bookDate.getMonth()) + "-" + 
                                this.formatDate(bookDate.getDate())}</div>

          <div className="col">{this.formatDate(bookDate.getHours() + ":" +
                                this.formatDate(bookDate.getMinutes()) + "-" +
                                
                                this.formatDate(endTime.getHours()) + ":" +
                                this.formatDate(endTime.getMinutes())
                                )}</div>
        </div>
        <Divider //... and adds a thin line below it 
        />
      </React.Fragment>
    );
  }
}

export default BookingListItem;
