import React, { Component } from "react";
import { Layout, Menu} from "antd";
import AvLocPane from "./AvLocPane.jsx";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";

const { Content} = Layout;



export default class AvailableLocations extends Component {
	constructor(props) {
		super(props);
		this.state = {};
  	}
  	//Handles the selected StartTime for the event
    handleStartTime(props){
        this.props.onStartTimeChange(props);
    }
    //Handles the selected EndTime for the event
    handleEndTime(props){
            this.props.onEndTimeChange(props);
   }

	//returns a schedule component with linked props
	render() {

		return (
			<table
                    className="custom-event-editor"
                    style={{ width: "20%", cellpadding: "5" }}
                  >
                    <tbody>

                      <tr>
                        <td className="e-textlabel">From</td>     {/*"from" entry here*/}
                        <td colSpan={4} >
                          <DateTimePickerComponent
                            format="dd/MM/yy hh:mm a"
                            id="StartTime"
                            data-name="StartTime"
                            className="e-field"
                            onChange={(e) => this.handleStartTime(e.target.value)}
                          ></DateTimePickerComponent>
                        </td>
                      </tr>
                      <tr>
                        <td className="e-textlabel">To</td>       {/*"to" entry here*/}
                        <td colSpan={4}>
                          <DateTimePickerComponent
                            format="dd/MM/yy hh:mm a"
                            id="EndTime"
                            data-name="EndTime"
                            onChange={(e) => this.handleEndTime(e.target.value)}
                            className="e-field"
                          ></DateTimePickerComponent>
                        </td>
                      </tr>
                    </tbody>
                  </table>

		  );
	}
}
