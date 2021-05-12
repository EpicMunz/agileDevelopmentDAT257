import {Component} from "react";
import {fetchData} from "../clientFetch/ClientFetch";
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
    handleSubmit(event) {
        event.preventDefault();
        var encryptedPassword = bcrypt.hashSync(this.state.password,10);

        var data = {
            Username: this.state.name,
            Password: encryptedPassword,
            Status: "User",
            Mail: this.state.email,
            Color: this.state.color
        }
        //Requests adding of user
        fetchData("/addUser", data);
        document.getElementById("formdata").reset();
        alert("New User added");
        this.props.onSubmit();

    }


    render(){
        return (<div className="rectangleAddAccount"><form id="formdata" onSubmit={(e) => this.handleSubmit(e)}>
                  <h3>Add User</h3>
                  <label>
                    Username:
                    <input type="text" name="name" onChange= {this.handleNameChange} required/>
                  </label>
                  <label>
                    Password:
                   <input type="password" name="password" onChange= {this.handlePasswordChange} required/>
                  </label>
                  <label>
                    Email:
                    <input type="text" name="email" onChange= {this.handleEmailChange} required/>
                  </label>
                  <label>
                    ColorCode:
                    <input type="text" name="color" onChange= {this.handleColorChange} required/>
                  </label>
                  <input type="submit" value="Submit" />
                </form></div>);

    }


}