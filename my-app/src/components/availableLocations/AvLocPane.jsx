import React, { Component } from "react";
import { fetchData } from "../clientFetch/ClientFetch";
import BookingListItem from "../bookingPage/BookingListItem";

class AvLocPane extends Component {
  state = { reRender: false };
  constructor(props) {
    super(props);
    this.getSavedLocationsData();
    this.locations = [];
  }

  async getSavedLocationsData() {
    var data = [
      {
        Id: 1,
      },
    ];
    const response = await fetchData("/getAllSavedData", data);
    const json = await response.json();
    this.getLocations(json);
  }

  async getLocations(savedLocationData) {
    var data = [
      {
        Id: 1,
      },
    ];
    const api_call = await fetchData("/getLocations", data);
    const response = await api_call.json();
    this.setState({
      locations: response,
      data: savedLocationData,
      dataReceived: true,
    });
  }

  onSuccessfulBooking = () => {
    this.getSavedLocationsData();
  };

  render() {
    //Collects the data from localStorage that is linked to the specified location

    if (this.state.locations != null) {
      this.locations = [];
      for (var i = 0; i < this.state.locations.features.length; i++) {
        this.locations.push(this.state.locations.features[i].properties.NAME);
      }
    }
    let startInput = new Date(this.props.startTime);
    let endInput = new Date(this.props.endTime);

    if (
      this.state.dataReceived &&
      this.props.startTime != null &&
      this.props.endTime != null
    ) {
      //<> </> can also be written as <React.fragment></React.fragment>, its used when you want to return multiple html elements from a component.

      return (
        <>
          <div className="row" style={{ fontWeight: "bold", fontSize: "25px" }}>
            {" "}
            {/* Top row containing three column titles Event, StartTid and SlutTid*/}
            <div className="col">Lokal</div>
            <div className="col">Datum</div>
            <div className="col">Tid</div>
            <div className="col"></div>
          </div>

          <tbody className="my-bookings-table">

            {/* Table containing all appointments for a specified location for the current owner */}
            {
              //location cycles through each location in the savedata from our db, element cycles through bookings for that particular location
              this.locations.map((location) => {
                this.state.data.forEach((element) => {
                  let start = new Date(element.StartTime);
                  let end = new Date(element.EndTime);
                  
                  if (location === element.Location) {
                    if (
                      startInput.getDate() <= end.getDate() &&
                      start.getDate() <= endInput.getDate()
                    ) {
                      if (
                        startInput.getHours() <= end.getHours() &&
                        start.getHours() <= endInput.getHours()
                      ) {
                        location = null;
                      }
                    }
                  }
                });
                if (location != null) {
                  
                  return (
                    <BookingListItem
                      Location={location}
                      startTime={startInput}
                      endTime={endInput}
                      onChange={this.onSuccessfulBooking}
                    />
                  );
                } else {
                  return null;
                }
              })
            }
          </tbody>
        </>
      );
    } else {
      return "";
    }
  }
}

export default AvLocPane;
