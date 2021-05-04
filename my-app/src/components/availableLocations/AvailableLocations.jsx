import React, { Component } from "react";
import { Layout, Menu, Input } from "antd";
import AvLocPane from "./AvLocPane.jsx";
import TimePicker from "./TimePicker.jsx";
const { Content } = Layout;

export default class AvailableLocations extends Component {
  constructor(props) {
    super(props);
    this.state = { timeSet: false };
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
	this.setState({EventName: e.target.value});
	this.EventName = e.target.value;
  }
 
	//returns a schedule component with linked props
	render() {
		return (
			<React.Fragment>


        <Layout>
          <Menu // The menu contains the different locations as items
            style={{ height: "100%", borderRight: 0 }}
            defaultSelectedKeys={["0"]}
            mode="inline"
            className="my-bookings"
          ></Menu>
          <h1>Ange titeln på ditt event</h1>
          <Input 
        placeholder="T.ex 'Bollkalas'" 
      value={this.state.EventName}
        onChange = {this.onChange}
      />
          <Content
            className="site-layout-background"
            style={{ padding: 24, margin: 0 }}
          >
            <AvLocPane startTime={this.StartTime} endTime={this.EndTime} eventName={this.EventName}/>
          </Content>
        </Layout>
      </React.Fragment>
    );
  }
}
