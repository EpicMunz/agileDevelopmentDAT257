import { Component } from "react";
import EditProfile from "./EditProfile.jsx";

export default class ManageProfilePage extends Component {
  state = { action: false };
  actionHasBeenTaken = () => {
    this.setState({ action: !this.state.action });
  };

  render() {
    return (
      <div>
        <EditProfile onSubmit={this.actionHasBeenTaken} />
      </div>
    );
  }
}
