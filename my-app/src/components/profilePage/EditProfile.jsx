import { message } from "antd";
import {Component} from "react";
import {fetchData} from "../clientFetch/ClientFetch";
import "./ManageProfilePage.jsx";
import "./EditProfile.css";
//import pen from "./pen.png";

var bcrypt = require('bcryptjs');

export default class EditProfile extends Component{

    constructor(props){
        super(props)
        this.state = { isActive: false,
            disabledEmail: true, disabledPassword: true, disabledNewPassword: true};         //byt till disabled istället för show, username: "", email: "", password: "",
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        
    }
    //Changes state values when textfield changes
    handleChangePassword(e){
        this.setState({password: e.target.value});
    }
    handleChangeEmail(e){
        this.setState({email: e.target.value});
    }

    handleEmail(){
        this.setState({disabledEmail: !this.state.disabledEmail});
    }
    handlePassword(){
        this.setState({disabledPassword: !this.state.disabledPassword});
        this.setState({disabledNewPassword: !this.state.disabledNewPassword});
    }
    handleSave(event){
        event.preventDefault();
        var data = [];
        if(this.state.password != null){
            var encryptedPassword = bcrypt.hashSync(this.state.password,10);
            data = {
                    Password: encryptedPassword,
                    Mail: this.state.email
            }
        }
        else {
            data = {
                    Mail: this.state.email
            }
        }
        //Requests adding of user
        fetchData("/editProfile", data);
        document.getElementById("saveform").reset();
        alert("Nya detaljer är sparade");
        this.props.onSubmit();

    }

    //Updates userData whenever you login to ManageProfilePage
    componentDidMount(){
        var fetchedData = JSON.parse(sessionStorage.getItem("userData"));
        this.setState({ email: fetchedData.Mail});
    }
    

    //Box of form
        render(){
            return (<div className="rectangleSave">
            <h3 className="rubrik" >Användarprofil</h3>
            <form id="saveform" onSubmit={(e) => this.handleSave(e)}>
                    <div>
                        <label className="alignment" type="text" name="userNameLabel">
                        Användarnamn: 
                        </label>
                        <div><label className="username" type="text" name="name"> {this.state.username} </label></div>
                    </div>
                    <div>
                        <label className="alignment" type="text" name="emailLabel">
                            Email:
                        </label>
                        <div>
                            <input className= "input" placeholder={this.state.email} type="text" name="email" disabled={this.state.disabledEmail} onChange={this.handleChangeEmail}/>
                            <img className="pen-logo" src={`${process.env.PUBLIC_URL}pen.png`} alt="edit" onClick={() => this.handleEmail()}/>
                        </div>    
                    </div>
                    <div>
                        <label className="alignment" type="password" name="passwordLabel">
                        Lösenord:
                        </label>
                        <div>
                            <input className="input" placeholder="nuvarande lösenord" type="password" name="password" disabled={this.state.disabledPassword} onChange={this.handleChangePassword}/>
                            <img className="pen-logo" src={`${process.env.PUBLIC_URL}pen.png`} alt="edit" onClick={() => this.handlePassword()} />
                        </div>
                    </div>
                    <div>
                        <label className="alignment" type="password" name="newPasswordLabel">
                        Nytt lösenord:
                        </label>
                        <div>
                            <input className="input" placeholder="nytt lösenord" type="password" name="newPassword" disabled={this.state.disabledNewPassword}/>
                        </div>   
                    </div>
                    <div className="save-button">
                        <input type="submit" value="Spara"/>
                    </div>
            </form></div>);
    
        }

}