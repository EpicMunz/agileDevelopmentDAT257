import React, { Component } from "react";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { loadCldr,L10n } from '@syncfusion/ej2-base';
import * as gregorian from 'cldr-data/main/sv/ca-gregorian.json';
import * as numbers from 'cldr-data/main/sv/numbers.json';
import * as timeZoneNames from 'cldr-data/main/sv/timeZoneNames.json';
import * as numberingSystems from 'cldr-data/supplemental/numberingSystems.json';
import * as weekData from 'cldr-data/supplemental/weekData.json';

loadCldr(numberingSystems, gregorian, numbers, timeZoneNames, weekData);

L10n.load({
  'sv': {
  'datetimepicker': {
    today:'idag'
}
  }
});



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
    this.handleEndTime(this.state.endTime || this.state.startTime);
    this.props.onStartTimeChange(props);
  }
  //Handles the selected EndTime for the event
  handleEndTime = (props) => {
      if(props != null){
        if(new Date(this.state.startTime).getHours() >= new Date(props).getHours() || new Date(this.state.startTime).getDate() > new Date(props).getDate()) {
                var time = new Date(this.state.startTime);
                time.setHours(new Date(this.state.startTime).getHours() + 1);
                this.setState({endTime: time});
                this.props.onEndTimeChange(time);
            }
            else {
                this.setState({endTime: props});
                this.props.onEndTimeChange(props);
            }
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
            <td className="e-textlabel">Från</td> {/*"from" entry here*/}
            <td colSpan={4}>
              <DateTimePickerComponent
                placeholder="Välj startdatum och starttid"
               // locale='sv'
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
            <td className="e-textlabel">Till</td> {/*"to" entry here*/}
            <td colSpan={4}>
              <DateTimePickerComponent
               // locale='sv'
                placeholder="Välj slutdatum och sluttid"
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
