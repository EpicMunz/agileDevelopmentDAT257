import React, { Component } from "react";
import AvLocListItem from "./AvLocListItem";
import * as locations from "../../data/locations.json";
import { fetchData } from "../ClientFetch";
import BookingListItem from "../bookingPage/BookingListItem";

class AvLocPane extends Component {

    constructor(props) {
		super(props);
		this.state = {reRender: false};
		this.getData();
		this.locations = [];
		this.onSuccessfulBooking = this.onSuccessfulBooking.bind(this);
    }

    async getData() {

            var data = [{
                    Id: 1
                    }];
                    const response = await fetchData("/getAllSavedData", data);
                    const json = await response.json();
                    this.data = json;
                    this.setState({dataReceived: true}); //used to rerender view
    }

   /*  //Is called when object has been used before instead of constructor when passing props
    componentWillReceiveProps(nextProps){
        this.data = nextProps.data;
        this.setState(state => ({
                dataReceived: true
            }));
    }
*/
    onSuccessfulBooking(){
        this.getData();
    }

    render() {
    //Collects the data from localStorage that is linked to the specified location
        this.locations = [];
        for(var i = 0; i < locations.features.length; i++){
               this.locations.push(locations.features[i].properties.NAME);
        }
        let startInput = new Date(this.props.startTime);
        let endInput = new Date(this.props.endTime);
        if(this.state.dataReceived && this.props.startTime != null && this.props.endTime != null){

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
                                   this.locations.map((location) => {
                                   this.data.map((element) => {

                                      let start = new Date(element.StartTime);
                                      let end = new Date(element.EndTime);

                                      if(location === element.Location){
                                          if((startInput.getDate() <= end.getDate()) && (start.getDate() <= endInput.getDate())){
                                              if(startInput.getHours() <= end.getHours() && (start.getHours() <= endInput.getHours())){
                                                     location = null;
                                              }
                                         }
                                         }


                                  })
                                    if(location != null){
                                                  return <BookingListItem
                                                          Location={location}
                                                          startTime={startInput}
                                                          endTime={endInput}
                                                          onChange={this.onSuccessfulBooking}
                                                        />;
                                              }
                                     })


                          }
                       </tbody>
                       </React.Fragment>
                   );
        }
        else {
            return "";
        }

    }

}

export default AvLocPane;
