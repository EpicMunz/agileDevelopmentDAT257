import React from "react";
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
  Resize,
  DragAndDrop,
  ExcelExport,
} from "@syncfusion/ej2-react-schedule";
import { isNullOrUndefined } from "@syncfusion/ej2-base";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { fetchData } from "./ClientFetch";

export default class App extends React.Component {
  state = { dataReceived: false };

  //comment needed
  async componentDidMount() {
    if (this.props.data == null) {
      var data = [
        {
          Id: 1,
          Location: this.props.location,
        },
      ];
      const api_call = await fetchData("/getSavedData", data);
      const response = await api_call.json();
      this.data = response;
      this.setState({ dataReceived: true });
    } else {
      this.componentWillReceiveProps(this.props);
    }
  }
  componentWillReceiveProps(nextProps) {
    this.data = nextProps.data;
    this.setState((state) => ({
      dataReceived: true,
    }));
  }

  //comment needed
  onActionBegin(args) {
    //Adds the excel export button to the toolbar
    if (args.requestType === "toolbarItemRendering") {
      let dividerRight = {
        align: "Right",
        cssClass: "e-toolbar-item e-schedule-seperator e-separator",
        type: "none",
      };
      args.items.push(dividerRight);

      let exportItem = {
        align: "Right",
        showTextOn: "Both",
        text: "Excel Export",
        cssClass: "e-excel-export",
        click: this.onExportClick.bind(this),
      };
      args.items.push(exportItem);
      let dividerLeft = {
        align: "Left",
        cssClass: "e-toolbar-item e-schedule-seperator e-separator",
        type: "none",
      };
      args.items.push(dividerLeft);
      let title = {
        align: "Left",
        showTextOn: "false",
        text: this.props.location,
      };
      args.items.push(title);
    }
    //Checks if current clicked appointment is empty
    if (args.requestType === "eventCreate" && args.data.length > 0) {
      let eventData = args.data[0];
      let eventField = this.scheduleObj.eventFields;
      let startDate = eventData[eventField.startTime];
      let endDate = eventData[eventField.endTime];

      args.cancel = !this.scheduleObj.isSlotAvailable(startDate, endDate);
    }
  }
  //exports current schedule data to excel document
  onExportClick() {
    this.scheduleObj.exportToExcel();
  }
  //Is called when cell with appointment is being rendered
  onEventRendered(args) {
    args.element.style.backgroundColor = args.data.color;
    if(this.props.data == null){
        fetchData("/save", this.data);
    }
  }
  //Creates a popup when double clicking a cell
  onPopupOpen(args) {
    const jsonData = JSON.parse(sessionStorage.getItem("userData"));
    const currentUser = jsonData.Username;
    const userStatus = jsonData.Status;
    if (
      args.data.Owner !== currentUser &&
      args.data.Owner !== undefined &&
      userStatus !== "admin" &&
      args.type === "Editor"
    ) {
      args.cancel = true;
    }
    if (args.type === "Editor") {
      let subjectElement = args.element.querySelector("#Summary"); //Saves the text from the summary field in Editor
      if (subjectElement) {
        subjectElement.value = args.data.Subject || ""; //What we receive is saved as value in subjectElement
      }
      let ownerElement = args.element.querySelector("#Owner"); //Saves the text from the hidden owner field in Editor
      if (ownerElement) {
        ownerElement.value = args.data.Owner || ""; //What we receive is saved as value in ownerElement
      }
    }
    let isCell = args.target.classList.contains('e-work-cells') || args.target.classList.contains('e-header-cells');
    if (args.type === "QuickInfo" && isCell) {
      args.cancel = true;
    }

  }
  /*
  When the popup closes, we use sessionStorage to determine
  who is currently the owner and add accordingly
  */
  onPopupClose(args) {
    if (args.type === "Editor" && !isNullOrUndefined(args.data)) {
      var jsonData = JSON.parse(sessionStorage.getItem("userData"));
      let subjectElement = args.element.querySelector("#Summary");
      if (subjectElement) {
        args.data.Subject = subjectElement.value; //Appends " - " + owner after printing summary value
      }
      let ownerElement = args.element.querySelector("#Owner");
      if (ownerElement) {
        
        var owner = jsonData.Username;
        args.data.Owner = owner; //set owner of cell from sessionStorage
      }
      let locationElement = args.element.querySelector("#Location");
      if (locationElement) {
        args.data.Location = this.props.location;
      }
      let colorElement = args.element.querySelector("#color");
      if (colorElement) {
        
        var color = jsonData.Color;
        args.data.color = color;
      }
    }
  }
  //Changes the header of the quickInfoPopup
  header(props) {
          return (<div>
      {props.elementType === "cell" ? (<div className="e-cell-header e-popup-header">
          <div className="e-header-icon-wrapper">
            <button id="close" className="e-close e-close-icon e-icons" title="Close" onClick={() => this.scheduleObj.closeQuickInfoPopup()}/>
          </div>
        </div>) : (<div className="e-event-header e-popup-header">
            <div className="e-header-icon-wrapper">
              <button id="close" className="e-close e-close-icon e-icons" title="CLOSE" onClick={() => this.scheduleObj.closeQuickInfoPopup()}/>
            </div>
          </div>)}
    </div>);
      }
  //should propably be an own component
  //returns the custom made popup appointment editor
  editorTemplate(props) {
    return props !== undefined ? (
      <table
        className="custom-event-editor"
        style={{ width: "100%", cellpadding: "5" }}
      >
        <tbody>
          <tr>
            <td className="e-textlabel">Summary</td> {/*"summary" entry here*/}
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
            <td className="e-textlabel"></td>{" "}
            {/*hidden owner entry here through sessionStorage to Owner id*/}
            <td colSpan={4}>
              <input
                id="Owner"
                className="e-field e-input"
                type="hidden"
                name="Owner"
                style={{ width: "100%" }}
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel"></td> {/*hidden location entry here*/}
            <td colSpan={4}>
              <input
                id="Location"
                className="e-field e-input"
                type="hidden"
                name="Location"
                style={{ width: "100%" }}
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel"></td> {/*hidden location entry here*/}
            <td colSpan={4}>
              <input
                id="color"
                className="e-field e-input"
                type="hidden"
                name="color"
                style={{ width: "100%" }}
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">From</td> {/*"from" entry here*/}
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
            <td className="e-textlabel">To</td> {/*"to" entry here*/}
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
  render(props) {
    //Returns the necessary html code to render schedule
    //Return is different if user is on MyBookings page vs regular location schedule
    if(this.props.data != null){
        return this.state.dataReceived ? (
            <ScheduleComponent
                    cssClass="excel-export"
                    ref={(schedule) => (this.scheduleObj = schedule)}
                    width="100%"
                    height="700px"
                    currentView="Week"
                    selectedDate={new Date()} //'new Date()' will fetch the current date
                    timeScale={{ enable: true, interval: 60, slotCount: 1 }}
                    editorTemplate={this.editorTemplate.bind(this)}
                    showQuickInfo={true}
                    popupOpen={this.onPopupOpen.bind(this)}
                    popupClose={this.onPopupClose.bind(this)}
                    eventRendered={this.onEventRendered.bind(this)}
                    eventSettings={{
                      dataSource: this.data,
                      fields: {
                        Id: "Id",
                        subject: { name: "Subject" },
                        source: { name: "Owner" },
                        location: { name: "Location" },
                        startTime: { name: "StartTime" },
                        endTime: { name: "EndTime" },
                        color: { name: "color" },
                      },
                    }}
                    actionBegin={this.onActionBegin.bind(this)}
                    quickInfoTemplates={{ header: this.header.bind(this)}}
                  >
                    <ViewsDirective>
                      <ViewDirective option="Day" startHour="00:00" endHour="00:00" />
                      <ViewDirective option="Week" startHour="00:00" endHour="00:00" />
                      <ViewDirective option="Month" />
                    </ViewsDirective>
                    <Inject
                      services={[
                        Day,
                        Week,
                        Month,
                        TimelineViews,
                        ExcelExport,
                      ]}
                    />
                  </ScheduleComponent>)
                  : (
                    <p>Loading Schedule...</p>
                    );
    }
    else {
        return this.state.dataReceived ? (
              <ScheduleComponent
                id = "schedule"
                cssClass="excel-export"
                ref={(schedule) => (this.scheduleObj = schedule)}
                width="100%"
                height="700px"
                currentView="Week"
                selectedDate={new Date()} //'new Date()' will fetch the current date
                timeScale={{ enable: true, interval: 60, slotCount: 1 }}
                editorTemplate={this.editorTemplate.bind(this)}
                showQuickInfo={true}
                popupOpen={this.onPopupOpen.bind(this)}
                popupClose={this.onPopupClose.bind(this)}
                eventRendered={this.onEventRendered.bind(this)}
                eventSettings={{
                  dataSource: this.data,
                  fields: {
                    id: "Id",
                    subject: { name: "Subject" },
                    source: { name: "Location" },
                    location: { name: "Owner" },
                    startTime: { name: "StartTime" },
                    endTime: { name: "EndTime" },
                    color: { name: "color" },
                  },
                }}
                actionBegin={this.onActionBegin.bind(this)}
                quickInfoTemplates={{ header: this.header.bind(this)}}
              >
                <ViewsDirective>
                  <ViewDirective option="Day" startHour="00:00" endHour="00:00" />
                  <ViewDirective option="Week" startHour="00:00" endHour="00:00" />
                  <ViewDirective option="Month" />
                </ViewsDirective>
                <Inject
                  services={[
                    Day,
                    Week,
                    Month,
                    TimelineViews,
                    Resize,
                    DragAndDrop,
                    ExcelExport,
                  ]}
                />
              </ScheduleComponent>
            ) : (
              <p>Loading Schedule...</p>
            );
    }

  }
}
