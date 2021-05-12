import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { fetchData } from "../clientFetch/ClientFetch";
import LoginPage from "./LogInPage.jsx";
import "./LoginPage.css";

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

    <div>

    <div id="container">
       <img
              src={`${process.env.PUBLIC_URL}borderColor.png`}
              id="img1"
              width="1980"
              height="65"
              alt=""
        />

        <img
              src={`${process.env.PUBLIC_URL}MKlogga.png`}
              id="img2"
              className= "imgBorder"
              width="55"
              height="55"
              alt=""
        />
        </div>

      <Form className= "box"
        name="basic"
        initialValues={{
          remember: true,
        }}
      >
        <h1>Glömt lösenord? </h1>
        <h3>Ingen fara ange din e-post så skickar vi en länk för att återställa</h3>

        <Form.Item className= "spacing"
          label="Ange din mail"
          name="mail"
          rules={[
            {
              message: "Ej giltig mail",
            },
          ]}
        >
          <Input value={this.state.adress} onChange={this.onChange}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={this.onSubmit}>
            Submit
          </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="primary" htmlType="submit" onClick={this.onBack}>
            Back
          </Button>
        </Form.Item>
      </Form>
       </div>
    );
  }
}
