import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import ReactMapGl, { Marker, Popup } from "react-map-gl";
import NewLocation from "./NewMapLocation.jsx";
import {fetchData } from "../ClientFetch.jsx";

export default class InteractiveMap extends Component {

  constructor(props){
    super(props)
    this.getData();
    this.handleRemoveLocation = this.handleRemoveLocation.bind(this);
  }
  state = {
    //This makes it so that the map is created with a focus over Chalmers university
    viewport: {
      latitude: 57.68861,
      longitude: 11.978938,
      width: "100vw",
      height: "100vh",
      zoom: 16,
    },
    selectedPremise: null,
    newLocation: null,
    data: null,
  };
  //Sends a request to the server for the data of all locations
  async getData() {
        var data = [
          {
            Id: 1,
          },
        ];
        const api_call = await fetchData("/getLocations", data);
        const response = await api_call.json();
        this.setState({data: response, newLocation: null, selectedPremise: null});
    }

  handleClick = (location) => {
    this.props.onLocationChange(location);
  };
  //Sends locationData of the location that is to be removed to the server
  async handleRemoveLocation(locationName){
      var data = {
        name: locationName
      }
      await fetchData("/removeLocation", data);
      this.getData();

  }
  //On single click on empty spot on map
  onMapClick(locationData){
    if(JSON.parse(sessionStorage.getItem("userData")).Status === "admin"){
        this.setState({newLocation: locationData});
    }
    this.setState({selectedPremise: null});
  }

  render() {

        return this.state.data != null ? (
              <div>
                <ReactMapGl
                  {...this.state.viewport}
                  //Restyles the map, this one is called satellite but there are many styles to chose from

                  //Basic view
                  mapStyle="mapbox://styles/zneed/cknob180n4u8p17ny8h3qm0xr"
                  //This accesses the mapBox(google map) token
                  mapboxApiAccessToken={
                    "pk.eyJ1Ijoiem5lZWQiLCJhIjoiY2tuaGpydWFqM2ZqMDJvbng5MHRudGY4OSJ9.D11Dq-An0CoSaUa4JPzQbQ"
                  }
                  //When someone interacts with the map it sends a new viewport back so that the variables are changed. With this you can therefore move the map
                  onViewportChange={(viewport) => {
                    this.setState({ viewport });
                  }}
                  onClick={(element) => {
                    this.onMapClick(element);
                  }}
                >
                  {/*Shows our locations on the map with a button, created an event on the button to make it interactable*/}
                  {this.state.data.features.map((premises) => (
                    <Marker
                      key={premises.properties.LOCATION_ID}
                      latitude={premises.geometry.coordinates[0]}
                      longitude={premises.geometry.coordinates[1]}
                    >
                      <button
                        className="marker-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          this.setState({ selectedPremise: premises });
                          this.setState({ newLocation: null});
                        }}
                      >
                        <img src="redButton.png" alt="Premise button" />
                      </button>
                    </Marker>
                  ))}
                  {/*If a button is clicked a popup window is created at that location on the map*/}
                  {this.state.selectedPremise ? (
                    <Popup
                      latitude={this.state.selectedPremise.geometry.coordinates[0]}
                      longitude={this.state.selectedPremise.geometry.coordinates[1]}
                    >
                      <div>
                        <h2>{this.state.selectedPremise.properties.NAME}</h2>
                        <p>{this.state.selectedPremise.properties.NOTES} </p>
                        <p>{this.state.selectedPremise.properties.FACILITY}</p>
                        <button
                          className="boka-tid-knapp"
                          onClick={() =>
                            this.handleClick(this.state.selectedPremise.properties.NAME)
                          }
                        >
                          Boka tid
                        </button>
                        {JSON.parse(sessionStorage.getItem("userData")).Status === "admin" ? (
                            <button
                                  className="boka-tid-knapp"
                                  onClick={() =>
                                    this.handleRemoveLocation(this.state.selectedPremise.properties.NAME)
                                  }
                                >
                                  Ta bort plats
                            </button>

                        ): null}
                      </div>
                    </Popup>

                  ) : null}
                  {this.state.newLocation != null ? (

                      <Popup
                        latitude={this.state.newLocation.lngLat[1]}
                        longitude={this.state.newLocation.lngLat[0]}
                      ><NewLocation
                        coordinates = {this.state.newLocation}
                        onChange={() => this.getData()}
                      />
                      </Popup>

                    ) :null}
                </ReactMapGl>
              </div>
            ) : null;
  }
}
