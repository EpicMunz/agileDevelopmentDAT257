import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { fetchData } from "../clientFetch/ClientFetch";
import LoginPage from "./LogInPage.jsx";

export default class ForgotPassword extends Component {
  state = {};

  /*
Reacts to the button submit being pressed
sends an email to the mail address given, if it exists in the database
*/
  onSubmit = async () => {
    var data = { Mail: this.state.adress };
    var response = await fetchData("/getUsersMail", data);
    var ofund = await response.json();
    if (ofund.Response === "Mail has been sent") {
      alert("Mail skickat");
    } else {
      alert("Mail hittades inte");
    }
  };

  onChange = (e) => {
    this.setState({ adress: e.target.value });
  };

  onBack = (e) => {
    this.props.onDisplayChange(LoginPage);
  };

  render() {
    return (
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          label="Ange din mail"
          name="mail"
          rules={[
            {
              message: "Ej giltig mail",
            },
          ]}
        >
          <Input value={this.state.adress} onChange={this.onChange} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={this.onSubmit}>
            Submit
          </Button>
          <Button type="primary" htmlType="submit" onClick={this.onBack}>
            Back
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
