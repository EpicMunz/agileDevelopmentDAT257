import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { fetchData } from "./ClientFetch";

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
  }

 async onSubmit(){
    var data = { Mail:this.state.adress}
    var response = await fetchData("/getUsersMail",data); 
    var ofund = await response.json();
    if (ofund.Response === "Mail has been sent"){
        alert("ajjemena");
    }else{
      alert("DET VAR SOUPER-CLOSE JAG LOUVER");
    }
    
    
}
  
onChange = (e) => {
	this.setState({adress: e.target.value});
    //alert(this.adress);
  }

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
          <Input value={this.state.adress} onChange = {this.onChange} />
        </Form.Item>

        <Form.Item >
          <Button type="primary" htmlType="submit" onClick = {this.onSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
