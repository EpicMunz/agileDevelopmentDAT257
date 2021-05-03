import React, { Component } from "react";
import { Layout, Menu} from "antd";
import AvLocPane from "./AvLocPane.jsx";
import TimePicker from "./TimePicker.jsx";
const { Content} = Layout;


export default class AvailableLocations extends Component {
	constructor(props) {
		super(props);
		this.state = { timeSet: false};
        this.StartTime = null;
        this.EndTime = null;

  	}

    changeStartTime(args){
        this.StartTime = args;
        if(this.EndTime !== ""){
            this.setState(state => ({
                          timeSet: !this.state.timeSet
                      }));
        }
    }
    changeEndTime(args){
        this.EndTime = args;
        if(this.StartTime !== ""){
                    this.setState(state => ({
                                              timeSet: !this.state.timeSet
                                          }));
        }
    }
	//returns a schedule component with linked props
	render() {
		return (
			<React.Fragment>

			  <h1 className="display-1">Tillgängliga lokaler</h1>
			  <TimePicker
              			    onStartTimeChange = {this.changeStartTime.bind(this)}
              			    onEndTimeChange = {this.changeEndTime.bind(this)}
              			  />
			  <Layout>
				  <Menu // The menu contains the different locations as items
					style={{ height: "100%", borderRight: 0 }}
					defaultSelectedKeys={["0"]}
					mode="inline"
					className = "my-bookings"
				  >
				  </Menu>
				<Content
				  className="site-layout-background"
				  style={{ padding: 24, margin: 0 }}
				>
				  <AvLocPane
				    startTime = {this.StartTime}
				    endTime = {this.EndTime}
				  />
				</Content>
			  </Layout>
			</React.Fragment>
		  );
	}
}
