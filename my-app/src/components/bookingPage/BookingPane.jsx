import React, { Component } from "react";
import BookingListItem from "./BookingListItem";

class BookingPane extends Component {

  render() {
  //Collects the data from localStorage that is linked to the specified location
  this.data = JSON.parse(localStorage.getItem(this.props.location));
    if(this.data != null){
        return (
              <React.Fragment>
                 <div className="row" style={{ fontWeight: "bold", fontSize: "25px"  }}> {/* Top row containing three column titles Event, StartTid and SlutTid*/}
                      <div className="col">Event</div>
                      <div className="col">Datum</div>
                      <div className="col">Tid</div>
                </div>

                <tbody className="my-bookings-table" > {/* Table containing all appointments for a specified location for the current owner */}
                      {
                          this.data.map(function (element) {
                             return <BookingListItem
                                  eventName={element.Subject}
                                  startTime={element.StartTime}                                                           
                                  endTime={element.EndTime}
                            />;
                          })
                      }
               </tbody>


              </React.Fragment>
            );
    }
    //Checks if a location has been chosen
    else if(this.props.location != null){
    return(<p>Inga bokade tider för platsen</p>);
    }
    else {
    return(<p>Vänligen välj en plats!</p>);
    }

  }
}


export default BookingPane;
