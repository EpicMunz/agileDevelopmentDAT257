import React, { useState, Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import ReactMapGl, { Marker, Popup } from "react-map-gl";
import * as locations from "../data/locations.json";

export default class InteractiveMap extends Component {
  //This makes it so that the map is created with a focus over Chalmers university
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 57.68861,
        longitude: 11.978938,
        width: "100vw",
        height: "100vh",
        zoom: 16,
      },
      selectedPremise: null,
    };
  }

  render() {
    return (
      <div>
        <ReactMapGl
          {...this.state.viewport}
          //Restyles the map, this one is called satellite but there are many styles to chose from
          //Satellite view
          //mapStyle="mapbox://styles/zneed/cknk41gmn04hw18mc0egyl2im"
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
        >
          {/*Shows our locations on the map with a button, created an event on the button to make it interactable*/}
          {locations.features.map((premises) => (
            <Marker
              key={premises.properties.LOCATION_ID}
              latitude={premises.geometry.coordinates[0]}
              longitude={premises.geometry.coordinates[1]}
            >
              <button
                className="marker-btn"
                onClick={(e) => {
                  e.preventDefault();
                  this.state.selectedPremise = premises;
                }}
              >
                <img src="redButton.png" alt="Premise button" />
              </button>
            </Marker>
          ))}
          //If a button is clicked a popup window is created at that location on the map
          {this.state.selectedPremise ? (
            <Popup
              latitude={this.state.selectedPremise.geometry.coordinates[0]}
              longitude={this.state.selectedPremise.geometry.coordinates[1]}
            >
              <div>
                <h2>{this.state.selectedPremise.properties.NAME}</h2>
                <p>{this.state.selectedPremise.properties.NOTES} </p>
                <p>{this.state.selectedPremise.properties.FACILITY}</p>
              </div>
            </Popup>
          ) : null}
        </ReactMapGl>
      </div>
    );
  }
}
