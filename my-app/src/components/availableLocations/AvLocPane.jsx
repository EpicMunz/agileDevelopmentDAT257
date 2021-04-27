import React, { Component } from "react";
import AvLocListItem from "./AvLocListItem";
import * as locations from "../../data/locations.json";


class AvLocPane extends Component {

    constructor(props) {
		super(props);
		this.state = {};
  	}

    render() {
    //Collects the data from localStorage that is linked to the specified location

        let locList;

            return (
                <React.Fragment>
                    <div className="row" style={{ fontWeight: "bold", fontSize: "25px"  }}> {/* Top row containing three column titles Event, StartTid and SlutTid*/}
                        <div className="col">Lokal</div>
                        <div className="col">Datum</div>
                        <div className="col">Tid</div>
                        <div className="col"></div>
                    </div>

                    <tbody className="my-bookings-table" > {/* Table containing all appointments for a specified location for the current owner */}

                    {
                        locations.features.map((premises) => {
                            
                            return <h1>{premises.properties.NAME}</h1>;
                            
                            })
                    }

                        
                </tbody>


                </React.Fragment>
            );
    }

}


export default AvLocPane;
