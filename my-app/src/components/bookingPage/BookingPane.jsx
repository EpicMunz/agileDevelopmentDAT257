import React, { Component } from "react";
import BookingListItem from "./BookingListItem";

class BookingPane extends Component {

  render() {
  //Collects the data from localStorage that is linked to the specified location

    if(this.props.data != null){
        var location = this.props.location;
        return (
              <React.Fragment>
                 <div className="row" style={{ fontWeight: "bold", fontSize: "25px"  }}> {/* Top row containing three column titles Event, StartTid and SlutTid*/}
                      <div className="col">Event</div>
                      <div className="col">Datum</div>
                      <div className="col">Tid</div>
                </div>

                <tbody className="my-bookings-table" > {/* Table containing all appointments for a specified location for the current owner */}
                      {
                          location &&
                          this.props.data.map(function (element) {
                          if(element.Location == location){
                               return <BookingListItem
                                    eventName={element.Subject}
                                    startTime={element.StartTime}
                                    endTime={element.EndTime}
                              />;}
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
