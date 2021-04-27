import React, { Component } from "react";
import AvLocListItem from "./AvLocListItem";


class AvLocPane extends Component {

  render() {
  //Collects the data from localStorage that is linked to the specified location

    if(this.props.data != null){
        var hardDate = Date();
        return (
              <React.Fragment>
                 <div className="row" style={{ fontWeight: "bold", fontSize: "25px"  }}> {/* Top row containing three column titles Event, StartTid and SlutTid*/}
                      <div className="col">Lokal</div>
                      <div className="col">Datum</div>
                      <div className="col">Tid</div>
                      <div className="col"></div>
                </div>

                <tbody className="my-bookings-table" > {/* Table containing all appointments for a specified location for the current owner */}


                    <AvLocListItem 
                    location={"Teknologgården"}
                    startTime={"2021-04-27T10:00:00.000Z"}
                    endTime={"2021-04-26T13:00:00.000Z"}>
                    </AvLocListItem>
                      
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
