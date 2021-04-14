import React, { useState, Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import ReactMapGl from "react-map-gl"


export default class InteractiveMap extends Component {

    constructor(props) {
        super(props);
        this.state = { viewport: {
            latitude: 57.688610,
            longitude: 11.978938,
            width: "100vw",
            height: "100vh",
            zoom: 16
            }
        };
    }

    render() {
        return (
        <div>
            <ReactMapGl {...this.state.viewport}
            mapboxApiAccessToken={"pk.eyJ1Ijoiem5lZWQiLCJhIjoiY2tuaGpydWFqM2ZqMDJvbng5MHRudGY4OSJ9.D11Dq-An0CoSaUa4JPzQbQ"}>
            </ReactMapGl>
        </div>
        );
      }
}
