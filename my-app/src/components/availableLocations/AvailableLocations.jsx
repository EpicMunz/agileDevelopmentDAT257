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
    this.EventName = null;
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

  //reacts to changes of the eventname textfield
  onChange = (e) => {
    this.setState({ EventName: e.target.value });
    this.EventName = e.target.value;
  };

  //returns a schedule component with linked props
  render() {
    return (
      <React.Fragment>
      <div id="container">
          <h1 className="centerText" id="component1"> Ange tid för ditt event &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ange titeln på ditt event</h1>
          <div className="timePicker" id="container">
          <TimePicker id="component1"
            onStartTimeChange={this.changeStartTime.bind(this)}
            onEndTimeChange={this.changeEndTime.bind(this)}
          />
          <Input className="center"
            placeholder="T.ex 'Bollkalas'"
            value={this.state.EventName}
            onChange={this.onChange}
            width= "100"
            id= "component2"
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
               eventName={this.EventName}
           />
          </Content>
        </Layout>
        </div>
      </React.Fragment>
    );
  }
}
