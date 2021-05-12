import React, { Component } from "react";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";

export default class TimePicker extends Component {
  state={startTime: null, endTime: null, nextValidTime: null};
  //Handles the selected StartTime for the event
  handleStartTime = (props) => {
    var start = new Date(props);
    var end = new Date(this.state.endTime);
    if(start.getDate() < end.getDate()){
        this.setState({endTime: null});
    }
    var validTime = start;
    validTime.setHours(validTime.getHours() + 1);
    this.setState({startTime: props, nextValidTime: validTime});
    this.handleEndTime(this.state.endTime);
    this.props.onStartTimeChange(props);
  }
  //Handles the selected EndTime for the event
  handleEndTime = (props) => {
    if(new Date(this.state.startTime).getHours() === new Date(props).getHours()){
        var time = new Date(props);
        time.setHours(time.getHours() + 1);
        this.setState({endTime: time});
        this.props.onEndTimeChange(time);
    }
    else {
        this.setState({endTime: props});
        this.props.onEndTimeChange(props);
    }
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
            <td className="e-textlabel">From</td> {/*"from" entry here*/}
            <td colSpan={4}>
              <DateTimePickerComponent
                format="dd/MM/yy hh:mm a"
                id="StartTime"
                data-name="StartTime"
                className="e-field"
                value={this.state.startTime}
                onChange={(e) => this.handleStartTime(e.target.value)}
              ></DateTimePickerComponent>
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">To</td> {/*"to" entry here*/}
            <td colSpan={4}>
              <DateTimePickerComponent
                format="dd/MM/yy hh:mm a"
                id="EndTime"
                data-name="EndTime"
                onChange={(e) => this.handleEndTime(e.target.value)}
                className="e-field"
                value={this.state.endTime}
                strictMode={true}
                min={this.state.nextValidTime}
              ></DateTimePickerComponent>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
