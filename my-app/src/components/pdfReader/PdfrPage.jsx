import { Component } from "react";
import PdfReader from "./PdfReader.jsx";
import PdfrContainer from "./PdfrContainer.jsx";
import { Button } from "antd";
import "./PdfrPage.css";

export default class PdfrPage extends Component {
  state = {
    displayItems: false,
    currentDocument: "",
    buttonText: "Ladda in data",
  };

  toggleLoadItems = (input) => {
    var newName = "Ladda in data";

    if (this.state.buttonText !== "Göm data") {
      newName = "Göm data";
    }

    this.setState({
      displayItems: input,
      buttonText: newName,
    });
  };

  containerCallback = (docpath) => {
    //alert("docpath in page: " + docpath);
    this.setState({ currentDocument: docpath });
  };

  render() {
    return (
      <>
        <div className="titleText">Infopage</div>
        <Button
          className="loadDataButton"
          type="primary"
          onClick={() => this.toggleLoadItems(!this.state.displayItems)}
        >
          {this.state.buttonText}
        </Button>
        <PdfrContainer
          display={this.state.displayItems}
          updatePage={this.containerCallback}
        />
        <PdfReader document={this.state.currentDocument} />
      </>
    );
  }
}
