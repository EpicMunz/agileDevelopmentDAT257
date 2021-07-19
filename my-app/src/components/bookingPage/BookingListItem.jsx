import React, { Component } from "react";
import { Divider, Button, Modal, Input, message } from "antd";
import { fetchData } from "../clientFetch/ClientFetch";
import uuid from "react-uuid";

class BookingListItem extends Component {
  state = { modalIsVisible: false, eventTitle: null }; //maybe eventtitle should have a different initial value

  /*
  starts by fetching schedule data, then adds a schedule entry and sends it to the server.
  */
  async bookPremise() {
    if(this.state.eventTitle != null){
        var data = [
              {
                Location: this.props.Location,
              },
            ];
            const api_call = await fetchData("/getSavedData", data);
            const response = await api_call.json();
            var json = {
              Subject: this.state.eventTitle,
              Owner: JSON.parse(sessionStorage.getItem("userData")).Username,
              Location: this.props.Location,
              Color: JSON.parse(sessionStorage.getItem("userData")).Color,
              StartTime: this.props.startTime,
              EndTime: this.props.endTime,
              Id: response.length + 1,
              Guid: uuid(),
            };
            response[0].iterations--;
            response.push(json);
            const api_call2 = await fetchData("/save", response);
            const response2 = await api_call2.json();
            if(response2[0].response === "Failure"){
                message.error("Tiden är tyvärr upptagen, vänligen ta en annan tid.");
            }
            else {
                message.success("Bokningen har sparats");
            }
            this.props.onChange();
    }
    else {
        var config = {
                         title: 'Insert EventName!',
                       };
        Modal.error(config);
    }
  }

  formatDate(number) {
    if (number < 10) {
      number = "0" + number;
    }

    return number;
  }

  divFormatterForDate = (bookDate, endTime) => {
    if(bookDate.getDate() !== endTime.getDate()){
        return <div className="col">
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
    }
    else {
        return <div className="col">
              {bookDate.getFullYear() +
                "-" +
                this.formatDate(bookDate.getMonth()) +
                "-" +
                this.formatDate(bookDate.getDate())}
        </div>
    }
  }

  onBook = () => { //is called when the user clicks "Boka Platsen"
    this.setState({ modalIsVisible: true });
  };
  onCancel = () => {//is called when the user cancels the modal window, either by "back" or X
    this.setState({ modalIsVisible: false });
  };
  onTitleChange = (e) => {//is called when the input in the modal is changed
    this.setState({ eventTitle: e.target.value });
  };
  onOk = () => {};


  render() {
    var bookDate = new Date(this.props.startTime);
    var endTime = new Date(this.props.endTime);
    bookDate.setMonth(bookDate.getMonth() + 1);
    endTime.setMonth(endTime.getMonth() + 1);
    return (
        <React.Fragment // A really simple listitem that displays the events name, date and time as a row...
        >
          <div className="row" style={{ fontSize: "20px" }}>
            <div className="col">{this.props.Location}</div>
            {this.divFormatterForDate(bookDate, endTime)}
            <div className="col">
              {this.formatDate(bookDate.getHours()) +
                ":" +
                this.formatDate(bookDate.getMinutes()) +
                "-" +
                this.formatDate(endTime.getHours()) +
                ":" +
                this.formatDate(endTime.getMinutes())}
            </div>
            <div className="col">
              <Button type="primary" size="large" onClick={this.onBook}>
                Boka Platsen
              </Button>
              <Modal
                title="Välj en titel på ditt event"
                visible={this.state.modalIsVisible}
                mask={false}
                onCancel={this.onCancel}
                onOk={() => this.bookPremise()}

              >
                <Input
                  placeholder="T.ex 'bollkalas'"
                  onChange={this.onTitleChange}
                  rules={[
                                        {
                                          required: true,
                                          message: 'Please input an EventName!',
                                        },
                                  ]}
                />
              </Modal>
            </div>
          </div>
          <Divider //... and adds a thin line below it
          />
        </React.Fragment>
      );
  }
}

export default BookingListItem;
