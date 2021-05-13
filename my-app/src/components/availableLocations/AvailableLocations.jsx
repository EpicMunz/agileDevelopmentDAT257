import React, { Component } from "react";
import { Layout, Menu, Input } from "antd";
import AvLocPane from "./AvLocPane.jsx";
import TimePicker from "./TimePicker.jsx";
import "./AvailableLocations.css"
const { Content } = Layout;

export default class AvailableLocations extends Component {
  state = { timeSet: false };
  constructor(props) {
    super(props);
    this.StartTime = null;
    this.EndTime = null;
  }

  changeStartTime(args) {
    this.StartTime = args;
    if (this.EndTime !== "") {
      this.setState((state) => ({
        timeSet: !this.state.timeSet,
      }));
    }
  }

  changeEndTime(args) {
    this.EndTime = args;
    if (this.StartTime !== "") {
      this.setState((state) => ({
        timeSet: !this.state.timeSet,
      }));
    }
  }

  //returns a schedule component with linked props
  render() {
    return (
      <React.Fragment>
      <div id="container">

<h1 className="centerText" id="component1"> Ange tid för ditt event </h1>
      <div className="timePicker" id="container">

        <TimePicker id="component1"
          onStartTimeChange={this.changeStartTime.bind(this)}
          onEndTimeChange={this.changeEndTime.bind(this)}
        />

        </div>

        <Layout>
          <Menu // The menu contains the different locations as items
            style={{ height: "100%", borderRight: 0 }}
            defaultSelectedKeys={["0"]}
            mode="inline"
            className="my-bookings"
          ></Menu>
          <Content
            className="site-layout-background"
            style={{ padding: 24, margin: 0 }}
          >

            <AvLocPane
              startTime={this.StartTime}
              endTime={this.EndTime}
            />

          </Content>
        </Layout>
        </div>
      </React.Fragment>
    );
  }
}
