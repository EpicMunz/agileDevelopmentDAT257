import React, { Component } from "react";
import InteractiveMap from "../map/InteractiveMap";
import "./LoginPage.css";
import {fetchData} from "../clientFetch/ClientFetch";
import ForgotPassword from "./ForgotPassword.jsx";
import { Form, Input, Button, Checkbox } from 'antd';



export default class LogInPage extends Component {
  	constructor(props){
		super(props);
		this.state = { isActive: false,
		username: "", password: ""};
		this.handleLogin = this.handleLogin.bind(this);
	}

   //checks if username and password was correct, if yes then switch to map screen
	async handleLogin() {
		if(await this.getData()){
			this.props.onDisplayChange(InteractiveMap);
		}
		else{
			alert("Fel Användarnamn eller Lösenord!");
		}
	}
	//Asks server for userdata related to the username and password combination
	async getData(){
          var data = [{
              Username: this.state.username,
              Password: this.state.password
          }];
          var receivedData = await fetchData("/logInUser", data);
          var jsonData = await receivedData.json();
          if(jsonData != null && jsonData.Username != null){
            sessionStorage.setItem("userData", JSON.stringify(jsonData));
            return true;
          }
          return false;
      }

	onChange = (e) =>{
		this.props.onDisplayChange(ForgotPassword);
	}

	render(){


		return(
        <div>
        <img className="imgCenter" src={`${process.env.PUBLIC_URL}MKloginlogga.png`} alt="Avatar"
              width="500"
              height="400"
        />
        <Form className="items"
          name="basic"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item onChange={e=>this.setState({username:e.target.value})}
            label="Användarnamn"
            name="username"
            rules={[
              {
                required: true,
                message: 'Var god och skriv in ditt användarnamn!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item onChange={e=>this.setState({password:e.target.value})}
            label="Lösenord" 
            name="password"
            rules={[
              {
                required: true,
                message: 'Var god och skriv in ditt lösenord!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Kom ihåg mig</Checkbox>
          </Form.Item>
          <Form.Item >
            <Button type="primary" htmlType="submit" onClick={this.handleLogin}>
              Logga in
            </Button>
            	<Button
                        size= "small"
                        type="link"
                        onClick={this.onChange}>
                            Glömt mitt lösenord</Button>
          </Form.Item>
        </Form>
        </div>
      );
    }
}