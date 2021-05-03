import React, { Component } from "react";
import { Divider, Button } from "antd";
import { fetchData } from "../ClientFetch";
import uuid from 'react-uuid'

class BookingListItem extends Component {
  state = {};

  /*
  starts by fetching schedule data, then adds a schedule entry and sends it to the server.
  */
  async bookPremise() {
    var data = [{
      Location:this.props.Location
    }];
    const api_call = await fetchData("/getSavedData", data);
    const response = await api_call.json();
    var json = 
      {
        Subject: "default event",
        Owner: JSON.parse(sessionStorage.getItem("userData")).Username,
        Location: this.props.Location,
        color: JSON.parse(sessionStorage.getItem("userData")).Color,
        StartTime: this.props.startTime,
        EndTime: this.props.endTime,
        Id: response.length + 1,
        Guid: uuid(),
      };
    
    response.push(json);
    fetchData("/save", response);
    alert("Booking has been saved");
    this.props.onChange();
  }

  formatDate(number) {
    if (number < 10) {
      number = "0" + number;
    }

    return number;
  }

  render() {
    var bookDate = new Date(this.props.startTime);
    var endTime = new Date(this.props.endTime);
    bookDate.setMonth(bookDate.getMonth() + 1);
    endTime.setMonth(endTime.getMonth() + 1);
    if (bookDate.getDate() !== endTime.getDate()) {
      return (
        <React.Fragment // A really simple listitem that displays the events name, date and time as a row...
        >
          <div className="row" style={{ fontSize: "20px" }}>
            <div className="col">{this.props.Location}</div>
            <div className="col">
              {bookDate.getFullYear() +
                "-" +
                this.formatDate(bookDate.getMonth()) +
                "-" +
                this.formatDate(bookDate.getDate()) +
                " - " +
                endTime.getFullYear() +
                "-" +
                this.formatDate(endTime.getMonth()) +
                "-" +
                this.formatDate(endTime.getDate())}
            </div>

            <div className="col">
              {this.formatDate(
                bookDate.getHours() +
                  ":" +
                  this.formatDate(bookDate.getMinutes()) +
                  "-" +
                  this.formatDate(endTime.getHours()) +
                  ":" +
                  this.formatDate(endTime.getMinutes())
              )}
            </div>
            <div className="col">
              <Button
                type="primary"
                size="large"
                onClick={() => this.bookPremise()}
              >
                Boka Platsen
              </Button>
            </div>
          </div>
          <Divider //... and adds a thin line below it
          />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment // A really simple listitem that displays the events name, date and time as a row...
        >
          <div className="row" style={{ fontSize: "20px" }}>
            <div className="col">{this.props.Location}</div>
            <div className="col">
              {bookDate.getFullYear() +
                "-" +
                this.formatDate(bookDate.getMonth()) +
                "-" +
                this.formatDate(bookDate.getDate())}
            </div>

            <div className="col">
              {this.formatDate(
                bookDate.getHours() +
                  ":" +
                  this.formatDate(bookDate.getMinutes()) +
                  "-" +
                  this.formatDate(endTime.getHours()) +
                  ":" +
                  this.formatDate(endTime.getMinutes())
              )}
            </div>

            <div className="col">
              <Button
                type="primary"
                size="large"
                onClick={() => this.bookPremise()}
              >
                Boka Platsen
              </Button>
            </div>
          </div>
          <Divider //... and adds a thin line below it
          />
        </React.Fragment>
      );
    }
  }
}

export default BookingListItem;
