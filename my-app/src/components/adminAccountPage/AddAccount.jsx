import {Component} from "react";
import {fetchData} from "../clientFetch/ClientFetch";
import { Form, Input, Button} from "antd";
import "./AccountPage.css";

var bcrypt = require('bcryptjs');

//Component used for adding users
export default class AddAccountPage extends Component{



    constructor(props){
        super(props)
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
    }

    //Changes state values when textfield changes
    handleNameChange(e){
        this.setState({name: e.target.value});
    }
    handlePasswordChange(e){
        this.setState({password: e.target.value});
    }
    handleEmailChange(e){
        this.setState({email: e.target.value});
    }
    handleColorChange(e){
        this.setState({color: e.target.value});
    }

    //Is called when submitting form
    async handleSubmit(event) {
        //event.preventDefault();
        var encryptedPassword = bcrypt.hashSync(this.state.password,10);

        var data = {
            Username: this.state.name,
            Password: encryptedPassword,
            Status: "User",
            Mail: this.state.email,
            Color: this.state.color
        }
        //Requests adding of user
        var jsonData = await fetchData("/addUser", data);
        var response = await jsonData.json();
        document.getElementById("formdata").reset();
        alert(response.response);
        this.props.onSubmit();

    }


    render(){
    const layout = {
          labelCol: {
            span: 8,
          },
          wrapperCol: {
            span: 16,
          },
        };
        return (<div >
               <Form {...layout} id="formdata" className="formPosition" onFinish={(e) => this.handleSubmit(e)}>
                  <h1 className="textPosition">Lägg till användare</h1>
               <Form.Item
                   label="Användarnamn"
                   name="username"
                   rule={[
                     {required: true,
                       message: "Skriv in ditt önskade användarnamn!"
                     },
                   ]}
                   >
                     <Input
                        placeholder="önskat användarnamn"
                        type="usernamn"
                        name="username"
                        onChange={(e) => this.handleNameChange(e)} required/>
               </Form.Item>
               <Form.Item
                  label="Lösenord"
                  name="password"
                  rule={[
                    {required: true,
                      message: "Skriv in ditt önskade lösenord!"
                    },
                  ]}
                  >
                   <Input
                   placeholder="önskat lösenord"
                   type="password"
                   name="password"
                   onChange={(e) => this.handlePasswordChange(e)} required/>
                </Form.Item>
                  <Form.Item
                     label="E-mail"
                     name="email"
                     rule={[
                       {required: true,
                         message: "Skriv in din önskade email!"
                       },
                     ]}
                     >
                       <Input
                          placeholder="önskad email"
                          type="email"
                          name="email"
                          onChange={(e) => this.handleEmailChange(e)} required/>
                 </Form.Item>
                 <Form.Item
                    label="Färgkod"
                    name="colorcode"
                    rule={[
                      {required: true,
                        message: "Skriv in din önskade färgkod!"
                      },
                    ]}
                    >
                      <Input
                         placeholder="önskad färgkod"
                         type="colorcode"
                         name="colorcode"
                         onChange={(e) => this.handleColorChange(e)} required/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="buttonPosition">
                    Lägg till
                    </Button>
                </Form.Item>
                </Form>
                </div>);
    }
}
/*
 render(){
        return (<div className="rectangleAddAccount"><form id="formdata" onSubmit={(e) => this.handleSubmit(e)}>
                  <h3>Lägg till användare</h3>
                  <label>
                    Avnändarnamn:
                    <input type="text" name="name" onChange= {this.handleNameChange} required/>
                  </label>
                  <label>
                    Lösenord:
                   <input type="password" name="password" onChange= {this.handlePasswordChange} required/>
                  </label>
                  <label>
                    E-mail:
                    <input type="text" name="email" onChange= {this.handleEmailChange} required/>
                  </label>
                  <label>
                    Färgkod:
                    <input type="text" name="color" onChange= {this.handleColorChange} required/>
                  </label>
                  <input type="submit" value="Lägg till" />
                </form></div>);
    }
    */