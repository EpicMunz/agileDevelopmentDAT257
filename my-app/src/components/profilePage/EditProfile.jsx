import { Component } from "react";
import { fetchData } from "../clientFetch/ClientFetch";
import { Form, Button, Image, Input } from "antd";
import "./ManageProfilePage.jsx";
import "./EditProfile.css";

export default class EditProfile extends Component {
  state = {
    isActive: false,
    disabledEmail: true,
    disabledPassword: true,
    disabledNewPassword: true,
  };
  //Changes state values when textfield changes
  handleChangeOldPassword = (e) => {
    this.setState({ oldPassword: e.target.value });
  };
  handleChangeNewPassword = (e) => {
    this.setState({ newPassword: e.target.value });
  };
  handleChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  handleEmail = () => {
    this.setState({ disabledEmail: !this.state.disabledEmail });
  };
  handlePassword = () => {
    this.setState({ disabledPassword: !this.state.disabledPassword });
    this.setState({ disabledNewPassword: !this.state.disabledNewPassword });
  };
  // Sends the changed data to the server
  handleSave(event) {
    event.preventDefault();
    var data = [];
    if (this.state.newPassword != null && this.state.email != null) {
      data = {
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
        Mail: this.state.email,
        Username: JSON.parse(sessionStorage.getItem("userData")).Username,
      };
    } else if (this.state.email != null) {
      data = {
        Mail: this.state.email,
        Username: JSON.parse(sessionStorage.getItem("userData")).Username,
      };
    } else if (this.state.newPassword != null) {
      data = {
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
        Username: JSON.parse(sessionStorage.getItem("userData")).Username,
      };
    }


  

    //Requests adding of user
    fetchData("/editProfile", data);
    document.getElementById("saveform").reset();
    alert("Nya detaljer är sparade");
    this.props.onSubmit();
  }

  //Updates userData whenever you login to ManageProfilePage
  componentDidMount() {
    var fetchedData = JSON.parse(sessionStorage.getItem("userData"));
    this.setState({ username: fetchedData.Username, email: fetchedData.Mail });
  }

  //Box of form
  render() {
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };

    //Funktionerna funkar inte än

    return (
      <div 
      id="container">
        <h1
        id="text"
        className="font-size2">
          Om du vill byta E-mail eller lösenord kan du fylla i fälten nedan.
        </h1>
        <div 
        id="position1"
        className="font-size"
        >
          <h1 className="rubrik" >
            Användarnamn: &nbsp;&nbsp;&nbsp; {this.state.username}
          </h1>
          <h2 className="rubrik">
            Nuvarande e-mail: &nbsp;&nbsp;&nbsp; {this.state.email}
          </h2>
        </div>
          
            
        <Form 
          {...layout}
        initialValues={{
            remember: true,}} 
            id="position2">

            <Form.Item 
            label="Nuvarande lösenord"
            name="old-password"
            rule={[
              {required: true,
                message: "Skriv in ditt nuvarande lösenord!"
              },
            ]}
            >
              <Input/>
            </Form.Item>

            <Form.Item 
            label="Ny e-mail"
            name="email"
            rule={[
              {required: false,
                message: "Skriv in ditt lösenord!"
              },
            ]}
            >
              <Input/>
            </Form.Item>
            
            <Form.Item 
            label="Nytt lösenord"
            name="new-password"
            rule={[
              {required: false,
                message: "Skriv in ditt nya lösenord!"
              },
            ]}
            >
              <Input/>
            </Form.Item>

            <Form.Item>
            <Button
            onSubmit={(e) => this.handleSave(e)}
            type="primary" htmlType="submit" 
            className="button-position"
            >
              Spara
            </Button>
            </Form.Item>

        </Form>
      </div>


      /*<div className="rectangleSave">
        <h3 className="rubrik">{this.state.username}</h3>
        <form id="saveform" onSubmit={(e) => this.handleSave(e)}>
          <div>
            <label className="alignment" type="text" name="emailLabel">
              Email:
            </label>
            <div>
              <input
                className="input"
                placeholder={this.state.email}
                type="text"
                name="email"
                disabled={this.state.disabledEmail}
                onChange={this.handleChangeEmail}
              />
              <img
                className="pen-logo"
                src={`${process.env.PUBLIC_URL}pen.png`}
                alt="edit"
                onClick={() => this.handleEmail()}
              />
            </div>
          </div>
          <div>
            <label className="alignment" type="password" name="passwordLabel">
              Lösenord:
            </label>
            <div>
              <input
                className="input"
                placeholder="nuvarande lösenord"
                type="password"
                name="password"
                disabled={this.state.disabledPassword}
                onChange={this.handleChangeOldPassword}
              />
              <img
                className="pen-logo"
                src={`${process.env.PUBLIC_URL}pen.png`}
                alt="edit"
                onClick={() => this.handlePassword()}
              />
            </div>
          </div>
          <div>
            <label
              className="alignment"
              type="password"
              name="newPasswordLabel"
            >
              Nytt lösenord:
            </label>
            <div>
              <input
                className="input"
                placeholder="nytt lösenord"
                type="password"
                name="newPassword"
                disabled={this.state.disabledNewPassword}
                onChange={this.handleChangeNewPassword}
              />
            </div>
          </div>
          <div className="save-button">
            <input type="submit" value="Spara" />
          </div>
        </form>
      </div>*/
    );
  }
}
