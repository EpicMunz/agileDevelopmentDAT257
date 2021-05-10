import { Component } from "react";
import AddAccount from "./AddAccount.jsx";
import RemoveAccount from "./RemoveAccount.jsx";

//Main component for including all subcomponents
export default class AddAccountPage extends Component {
  state = { action: false };

  actionHasBeenTaken = () => {
    this.setState({ action: !this.state.action });
  };

  render() {
    return (
      <div>
        <AddAccount onSubmit={this.actionHasBeenTaken} />
        <RemoveAccount onSubmit={this.actionHasBeenTaken} />
      </div>
    );
  }
}
