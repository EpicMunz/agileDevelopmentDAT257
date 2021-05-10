import React, { Component } from "react";
import { Button } from "antd";
import "./PdfrItem.css";

export default class PdfrItem extends Component {
  
  //Sends path of clicked item to pdfrContainer
  openDocument = (docpath) => {
    //alert("docpath in openDocument: " + docpath);
    this.props.updateContainer(docpath);
  };

  render() {
    if (this.props.isDocument) {
      return (
        <>
          <div className="flex-container" style={{ fontSize: "20px" }}>
            <div className="flex-item docname">{this.props.docname}</div>
            <div className="flex-item location">{this.props.location}</div>
            <div className="flex-item doctype">{this.props.doctype}</div>
            <div className="flex-item open">
              <Button
                type="primary"
                onClick={() => this.openDocument(this.props.path)}
              >
                Open
              </Button>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="flex-container referenceItem">
            <div className="flex-item docname">{this.props.docname}</div>
            <div className="flex-item location">{this.props.location}</div>
            <div className="flex-item doctype">{this.props.doctype}</div>
            <div className="flex-item open"></div>
          </div>
        </>
      );
    }
  }
}