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
import { fetchData } from "../clientFetch/ClientFetch";
import {message} from "antd";

export default class App extends React.Component {
  state = { dataReceived: false };

  scheduleVariable1 = "Location";
  scheduleVariable2 = "Owner";
  check = false;

  //When component is run for the first time
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
    this.check = false;
  }
  //When component has already been created but has received new props
  componentWillReceiveProps(nextProps) {
    this.data = nextProps.data;
    this.setState({dataReceived: true});
  }
  //When appointment data has been changed in the scheduleComponent
  async onDataBound(){
    if(this.check === false){
      this.check = true;
    }
    else {
      if(this.data.length < 1 && this.props.location != null){
        var data = [{
          Location: this.props.location
        }]
        var response = await fetchData("/save", data);
        var json = await response.json();
        if(json[0].response === "Failure"){
            message.error("Tiden är tyvärr upptagen, vänligen ta en annan tid.");
        }
      }
      else if(this.props.location != null){
        var responseData = await fetchData("/save", this.data);
        var json = await responseData.json();
        if(json[0].response === "Failure"){
            message.error("Tiden är tyvärr upptagen, vänligen ta en annan tid.");
        }
      }
      this.componentDidMount();
    }
  }
  //Deleting appointment when pressing trashcan icon on quickInfoPopup
  onDelete(event){
        var data = [{
                Location: event.Location,
                Id: event.Id
        }]
        fetchData("/delete", data);
        try {
          this.props.updateParent();
        }
        catch(e){this.componentDidMount();}
  }

  //Is triggered on any action
  onActionBegin(args) {
    //Adds divider on right side of toolbar
    if (args.requestType === "toolbarItemRendering") {
      let dividerRight = {
        align: "Right",
        cssClass: "e-toolbar-item e-schedule-seperator e-separator",
        type: "none",
      };
      args.items.push(dividerRight);

      //Adds the excel export button to the toolbar
      let exportItem = {
        align: "Right",
        showTextOn: "Both",
        text: "Excel Export",
        cssClass: "e-excel-export",
        click: this.onExportClick.bind(this),
      };
      args.items.push(exportItem);

      //Adds divider on left side of toolbar
      let dividerLeft = {
        align: "Left",
        cssClass: "e-toolbar-item e-schedule-seperator e-separator",
        type: "none",
      };
      args.items.push(dividerLeft);

      //Adds location name on left side of toolbar
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
    if(args.requestType !== "eventCreate" && args.reqestType !== "eventChange"){
      this.check = false;

    }
    if(args.requestType === "eventRemove"){
        this.buttonClickActions(args);
    }
  }
  //Exports current schedule data to excel document
  onExportClick() {
    this.scheduleObj.exportToExcel();
  }
  //Is called when cell with appointment is being rendered
  onEventRendered(args) {
    args.element.style.backgroundColor = args.data.Color;
    
    if(args.data.Color === "#ffff00" // elektro
     || args.data.Color === "#a2ff00" // ae
     ){
      args.element.style.color = "#000000";
    }
    else{
      args.element.style.color = "#FFFFFF";
    }
    
  }
  //Creates a popup when double clicking a cell
  onPopupOpen(args) {
    //jsonData fetches info about current logged in user
    const jsonData = JSON.parse(sessionStorage.getItem("userData"));
    const currentUser = jsonData.Username;
    const userStatus = jsonData.Status;

    //Only privileged users can enter popup on a cell
    if (
      args.data.Owner !== currentUser &&
      args.data.Owner !== undefined &&
      userStatus !== "admin" &&
      args.type === "Editor"
    ) {
      args.cancel = true;
    }
    else {
        if(this.props.data != null && args.type !== "QuickInfo"){
            args.cancel = true;
        }
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
    if (args.target != null) {
      let isCell =
        args.target.classList.contains("e-work-cells") ||
        args.target.classList.contains("e-header-cells");
      if (args.type === "QuickInfo" && isCell) {
        args.cancel = true;
      }
    }
  }
  /*
  When the popup closes, we use sessionStorage to determine
  who is currently the owner and add accordingly
  */
  onPopupClose(args) {
    if (args.type === "Editor" && !isNullOrUndefined(args.data)) {
      var jsonData = JSON.parse(sessionStorage.getItem("userData"));
      let ownerElement = args.element.querySelector("#Owner");
      if (ownerElement) {
        var owner = jsonData.Username;
        args.data.Owner = owner; //set owner of cell from sessionStorage
      }
      let locationElement = args.element.querySelector("#Location");
      if (locationElement) {
        args.data.Location = this.props.location;
      }
      let colorElement = args.element.querySelector("#Color");
      if (colorElement) {
        var color = jsonData.Color;
        args.data.Color = color;
      }
      let mailElement = args.element.querySelector("#Mail");
      if (mailElement) {
        var mail = jsonData.Mail;
        args.data.Mail = mail;
      }
    }
  }
  buttonClickActions = (e) =>{
        var eventData = this.scheduleObj.activeEventData.event;

        this.onDelete(eventData);
        this.scheduleObj.closeQuickInfoPopup();
  }
  //Changes the header of the quickInfoPopup (adds X to leave popup)
  header(props) {
          return (<div className="e-event-header e-popup-header">
            <div className="e-header-icon-wrapper">
              {this.props.data != null && <button id="delete" className="e-delete e-delete-icon e-icons" title="DELETE" onClick={(e) => this.buttonClickActions(e)}/>}
              <button id="close" className="e-close e-close-icon e-icons" title="CLOSE" onClick={() => this.scheduleObj.closeQuickInfoPopup()}/>
            </div>
    </div>);
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
            <td className="e-textlabel"></td> {/*hidden color entry here*/}
            <td colSpan={4}>
              <input
                id="Color"
                className="e-field e-input"
                type="hidden"
                name="Color"
                style={{ width: "100%" }}
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel"></td> {/*hidden mail entry here*/}
            <td colSpan={4}>
              <input
                id="Mail"
                className="e-field e-input"
                type="hidden"
                name="Mail"
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
  //Return is different if user is on MyBookings page vs regular location schedule
  specificSchedule(){
    if(this.props.data!= null){
        return "Location";
    }
    else {
        return "Owner";
    }
  }
  render(props) {
    //Returns the necessary html code to render schedule
    return this.state.dataReceived ? (
        <ScheduleComponent
                cssClass="excel-export"
                ref={(t) => this.scheduleObj = t}
                width="100%"
                height="700px"
                currentView="Week"//'new Date()' will fetch the current date
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
                    description: { name: "Mail" },
                    location: { name: this.specificSchedule() },
                    source: { name: "Owner" },
                    startTime: { name: "StartTime" },
                    endTime: { name: "EndTime" },
                    color: { name: "Color" },
                  },
                }}
                actionBegin={this.onActionBegin.bind(this)}
                quickInfoTemplates={{ header: this.header.bind(this)}}
                dataBound={this.onDataBound.bind(this)}
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
}

