import React, { Component } from "react";
import { Divider, Button } from "antd";
import './PdfrItem.css';

class PdfrItem extends Component {
    constructor(props) {
        super(props);
        this.state = { timeSet: false };
      }

    render() {
        return (

            <>
                <div className="row" style={{ fontSize: "20px" }}>
                    <div className="col">a</div>
                    <div className="col">b</div>
                    <div className="col">c</div>
                    <div className="col">d</div>
                </div>
            </>
            
        );

    }

    /*<React.Fragment // A really simple listitem that displays the events name, date and time as a row...
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
                {this.formatDate(bookDate.getHours()) +
                    ":" +
                    this.formatDate(bookDate.getMinutes()) +
                    "-" +
                    this.formatDate(endTime.getHours()) +
                    ":" +
                    this.formatDate(endTime.getMinutes())
                }
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
            */

}

export default PdfrItem;