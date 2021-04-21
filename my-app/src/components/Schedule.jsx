import React from 'react';
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
  ExcelExport
} from "@syncfusion/ej2-react-schedule";
import { extend, createElement, isNullOrUndefined } from '@syncfusion/ej2-base';
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";

export default class App extends React.Component {


  constructor(props){
    super(props);
    //loads in saved jsondata from localStorage
    this.state = {location: this.props.location}
    if(!localStorage.getItem(this.state.location)){
        var dataTemp = [];
        localStorage.setItem(this.state.location, JSON.stringify(dataTemp));
    }
    this.data = JSON.parse(localStorage.getItem(this.state.location));
  }

  onActionBegin(args) {
      //Adds the excel export button to the toolbar
      if (args.requestType === 'toolbarItemRendering') {
          let exportItem = {
              align: 'Right', showTextOn: 'Both', prefixIcon: 'e-icon-schedule-excel-export',
              text: 'Excel Export', cssClass: 'e-excel-export', click: this.onExportClick.bind(this)
          };
          args.items.push(exportItem);
      }
      //Checks if current clicked appointment is empty
      if (args.requestType === 'eventCreate' && args.data.length > 0) {
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
    if (args.data.Owner === "Nollkit") {                  //Determines the value of the Owner attribute in 
      args.element.style.backgroundColor = "#09cdda";     //Sets color of cell accordingly
    } else if (args.data.Owner === "DNOLLK") {
      args.element.style.backgroundColor = "green";
    } else {
      args.element.style.backgroundColor = "blue";
    }
    //stringifies javascript object array schedule data to json and stores it in localStorage
    localStorage.setItem(this.state.location, JSON.stringify(this.data));

  }
  //Creates a popup when double clicking a cell
  onPopupOpen(args) {
    if (args.type === "Editor") {
      let subjectElement = args.element.querySelector("#Summary");  //Saves the text from the summary field in Editor
      if (subjectElement) {
        subjectElement.value = args.data.Subject || "";             //What we receive is saved as value in subjectElement
      }
      let ownerElement = args.element.querySelector("#Owner");      //Saves the text from the hidden owner field in Editor
      if (ownerElement) {
        ownerElement.value = args.data.Owner || "";                 //What we receive is saved as value in ownerElement
      }
    }
  }
  /*
  When the popup closes, we use sessionStorage to determine
  who is currently the owner and add accodingly
  */
  onPopupClose(args) {
    if (args.type === "Editor" && !isNullOrUndefined(args.data)) {
      let subjectElement = args.element.querySelector("#Summary");
      if (subjectElement) {
        args.data.Subject = subjectElement.value;     //Appends " - " + owner after printing summary value
      }
      let ownerElement = args.element.querySelector("#Owner");
      if (ownerElement) {
        args.data.Owner = sessionStorage.getItem("owner");                    //set owner of cell from sessionStorage
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
            <td className="e-textlabel">Summary</td>  {/*"summary" entry here*/}
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
            <td className="e-textlabel"></td>         {/*hidden owner entry here through sessionStorage to Owner id*/}
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
            <td className="e-textlabel">From</td>     {/*"from" entry here*/}
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
            <td className="e-textlabel">To</td>       {/*"to" entry here*/}
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
    sessionStorage.setItem("owner", "Nollkit");             //Updates sessionStorage each render
    //Returns the necessary html code to render schedule
    return (
      <ScheduleComponent
        cssClass='excel-export'
        ref={(t) => (this.scheduleObj = t)}
        width="100%"
        height="700px"
        cssClass='schedule-cell-dimension'
        currentView="Week"
        selectedDate={new Date()}                           //'new Date()' will fetch the current date
        timeScale={{ enable: true, interval: 60, slotCount: 1 }}
        editorTemplate={this.editorTemplate.bind(this)}
        showQuickInfo={false}
        popupOpen={this.onPopupOpen.bind(this)}
        popupClose={this.onPopupClose.bind(this)}
        eventRendered={this.onEventRendered.bind(this)}
        eventSettings={{dataSource: this.data,
        fields: {
                 id: 'Id',
                 subject: { name: 'Subject' },
                 location: { name: 'Owner' },
                 startTime: { name: 'StartTime' },
                 endTime: { name: 'EndTime' }
             }}}
        actionBegin={this.onActionBegin.bind(this)}
      >
        <ViewsDirective>
          <ViewDirective option="Day" startHour="00:00" endHour="00:00" />
          <ViewDirective option="Week" startHour="00:00" endHour="00:00" />
          <ViewDirective option="Month" />
        </ViewsDirective>
        <Inject services={[Day, Week, Month, TimelineViews, Resize, DragAndDrop, ExcelExport]} />
      </ScheduleComponent>
    );
  }
}
