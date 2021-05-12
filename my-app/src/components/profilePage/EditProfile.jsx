import { Component } from "react";
import { fetchData } from "../clientFetch/ClientFetch";
import { Form, Button, Input } from "antd";
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
  handleSave = async (event) =>{
    event.preventDefault();
    var data = [];
    if(this.state.oldPassword != null){
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
                oldPassword: this.state.oldPassword,
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
            var jsonData = await fetchData("/editProfile", data);
            var response = await jsonData.json();
            document.getElementById("position2").reset();
            alert(response.response);
            this.props.onSubmit();
    }
    else {
        alert("Ange gammalt lösenord");
    }

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
          onSubmit={this.handleSave}
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
              <Input
                     placeholder="nuvarande lösenord"
                     type="password"
                     name="password"
                     onChange={(e) => this.handleChangeOldPassword(e)}/>
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
              <Input
                placeholder={this.state.email}
                type="text"
                name="email"
                onChange={(e) => this.handleChangeEmail(e)}
              />
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
              <Input
                  placeholder="nytt lösenord"
                  type="password"
                  name="newPassword"
                  onChange={(e) => this.handleChangeNewPassword(e)}
              />
            </Form.Item>

            <Form.Item>
            <Button
            type="primary"
            htmlType="submit"
            onClick={this.handleSave}
            className="button-position"
            >
                          Submit
                        </Button>
            </Form.Item>

        </Form>
      </div>
    );
  }
}
