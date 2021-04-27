import React, { Component } from "react";
import AvLocListItem from "./AvLocListItem";
import * as locations from "../data/locations.json";

class AvLocPane extends Component {

  render() {
  //Collects the data from localStorage that is linked to the specified location

    if(this.props.data != null){
        var location = this.props.location;
        return (
              <React.Fragment>
                 <div className="row" style={{ fontWeight: "bold", fontSize: "25px"  }}> {/* Top row containing three column titles Event, StartTid and SlutTid*/}
                      <div className="col">Lokal</div>
                      <div className="col">Datum</div>
                      <div className="col">Tid</div>
                </div>

                <tbody className="my-bookings-table" > {/* Table containing all appointments for a specified location for the current owner */}
                      {
                          location &&
                          this.props.data.map(function (element) {
                            /*
                            1. Get all location names from json
                            2. iterate through every name and see if the booking currently searched is available
                                if so add to list
                            3. Display list with listitems
                            -----
                            for each booking in json:
                                if not ((booking.starttime == start and booking.endtime == end)
                                and booking.date == date):
                                    add location and time to list
                            )*/

                        
                          if(element.Location == location){
                               return <AvLocListItem
                                    location={element.Location}
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


export default AvLocPane;
