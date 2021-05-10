import React, { Component } from "react";
import "./NewMapLocation.css";
import { fetchData } from "../clientFetch/ClientFetch.jsx";

export default class NewMapLocation extends Component {
  state = { name: "", description: "" };

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };
  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };
  //Send new location data to server
  async handleSubmit(event) {
    event.preventDefault();
    var data = {
      type: "Feature",
      properties: {
        LOCATION_ID: null,
        NAME: this.state.name,
        NOTES: "Outdoor",
        FACILITY: this.state.description,
      },
      geometry: {
        type: "Point",
        coordinates: [
          this.props.coordinates.lngLat[1],
          this.props.coordinates.lngLat[0],
        ],
      },
    };
    await fetchData("/addLocation", data);
    this.props.onChange();
  }
  //renders add location popup on map
  render() {
    return (
      <div className="rectangleNewLocation">
        <h2>Lägg till Plats</h2>
        <form id="formdata" onSubmit={(e) => this.handleSubmit(e)}>
          <label>
            Name of location:
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={this.state.description}
              onChange={this.handleDescriptionChange}
            />
          </label>
          <input
            className="boka-tid-knapp"
            type="submit"
            value="Lägg till plats"
          />
        </form>
      </div>
    );
  }
}
