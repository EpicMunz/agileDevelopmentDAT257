import React from "react";
import ReactDom from "react-dom";

//Importing from syncfusion api for schedule
import {
  ScheduleComponent,
  Day,
  Week,
  Month,
  Inject,
  ViewsDirective,
  ViewDirective,
  TimelineViews,
} from "@syncfusion/ej2-react-schedule";
import { extend, createElement, isNullOrUndefined } from "@syncfusion/ej2-base";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

export default class App extends React.Component {
  //Is called when cell with appointment is being rendered
  onEventRendered(args) {
    if (args.data.Owner == "Nollkit") {
      args.element.style.backgroundColor = "#09cdda";
    } else if (args.data.Owner == "DNOLLK") {
      args.element.style.backgroundColor = "green";
    } else {
      args.element.style.backgroundColor = "blue";
    }
  }
  //Creates a popup when double clicking a cell
  onPopupOpen(args) {
    if (args.type === "Editor") {
      let subjectElement = args.element.querySelector("#Summary");
      if (subjectElement) {
        subjectElement.value = args.data.Subject || "";
      }
      let ownerElement = args.element.querySelector("#Owner");
      if (ownerElement) {
        ownerElement.value = args.data.Owner || "";
      }
    }
  }
  //When the popup closes
  onPopupClose(args) {
    if (args.type === "Editor" && !isNullOrUndefined(args.data)) {
      let subjectElement = args.element.querySelector("#Summary");
      if (subjectElement) {
        args.data.Subject =
          subjectElement.value + " - " + sessionStorage.getItem("owner");
      }
      let ownerElement = args.element.querySelector("#Owner");
      if (ownerElement) {
        args.data.Owner = sessionStorage.getItem("owner");
      }
    }
  }
  //returns the custom made popup appointment editor
  editorTemplate(props) {
    return props !== undefined ? (
      <table
        className="custom-event-editor"
        style={{ width: "100%", cellpadding: "5" }}
      >
        <tbody>
          <tr>
            <td className="e-textlabel">Summary</td>
            <td colSpan={4}>
              <input
                id="Summary"
                className="e-field e-input"
                type="text"
                name="Subject"
                style={{ width: "100%" }}
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel"></td>
            <td colSpan={4}>
              <input
                id="Owner"
                className="e-field e-input"
                type="hidden"
                name="Subject"
                style={{ width: "100%" }}
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">From</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                format="dd/MM/yy hh:mm a"
                id="StartTime"
                data-name="StartTime"
                value={new Date(props.startTime || props.StartTime)}
                className="e-field"
              ></DateTimePickerComponent>
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">To</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                format="dd/MM/yy hh:mm a"
                id="EndTime"
                data-name="EndTime"
                value={new Date(props.endTime || props.EndTime)}
                className="e-field"
              ></DateTimePickerComponent>
            </td>
          </tr>
        </tbody>
      </table>
    ) : (
      <div></div>
    );
  }
  render() {
    sessionStorage.setItem("owner", "Nollkit");

    //Returns the necessary html code to render schedule
    return (
      <ScheduleComponent
        ref={(t) => (this.scheduleObj = t)}
        width="100%"
        height="550px"
        currentView="Week"
        selectedDate={new Date(2017, 11, 15)}
        timeScale={{ enable: true, interval: 60, slotCount: 1 }}
        editorTemplate={this.editorTemplate.bind(this)}
        showQuickInfo={false}
        popupOpen={this.onPopupOpen.bind(this)}
        popupClose={this.onPopupClose.bind(this)}
        eventRendered={this.onEventRendered.bind(this)}
      >
        <ViewsDirective>
          <ViewDirective option="Day" startHour="00:00" endHour="00:00" />
          <ViewDirective option="Week" startHour="00:00" endHour="00:00" />
          <ViewDirective option="Month" />
        </ViewsDirective>
        <Inject services={[Day, Week, Month, TimelineViews]} />
      </ScheduleComponent>
    );
  }
}
