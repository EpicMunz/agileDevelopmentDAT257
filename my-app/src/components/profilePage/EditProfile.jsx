import { message } from "antd";
import {Component} from "react";
//import {fetchData} from "../clientFetch/ClientFetch";
import "./ManageProfilePage.jsx";

export default class EditProfile extends Component{

    constructor(props){
        super(props)
        this.state = { isActive: false,
            username: "", email: "", password: "", disabledEmail: true, disabledPassword: true, disabledNewPassword: true};         //byt till disabled istället för show
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

    componentDidMount(){
        var fetchedData = JSON.parse(sessionStorage.getItem("userData"));     
        console.log(fetchedData.Username);   
        this.setState({username: fetchedData.Username, email: fetchedData.Mail});
        //this.setState({email: JSON.parse(sessionStorage.getItem("userData").Mail)});
        //this.setState({password: JSON.parse(sessionStorage.getItem("userData").Password)});
    }
    

    //Box of form
        render(){
            return (<div className="rectangleSave">
            <h3>Användarprofil</h3>
            <form id="saveform" onSubmit={(e) => this.handleSave(e)}>
                    <div>
                        <label style={{backgroundColor: "lightblue"}} type="text" name="name"> 
                        Användarnamn: 
                        {this.state.username}
                        </label>
                    </div>
                    <div>
                        <label type="text" name="name">
                        Email:
                        </label>
                        <input placeholder={this.state.email} type="text" name="name" disabled={this.state.disabledEmail}/>
                        <image style={{backgroundColor:"lightblue"}} onClick={this.handleEmail}> byt email </image>             
                    </div>
                    <div>
                        <label type="password" name="password">
                        Lösenord:
                        </label>
                        <input placeholder="gammalt lösenord" type="password" name="name" disabled={this.state.disabledPassword}/>   
                        <image style={{backgroundColor:"lightblue"}} onClick={this.handlePassword}> byt lösenord </image>     
                    </div>
                    <div>
                        <label type="password" name="password">
                        Nytt lösenord:
                        </label>
                        <input placeholder="nytt lösenord" type="password" name="name" disabled={this.state.disabledNewPassword}/>      
                    </div>
                    <input type="submit" value="Spara" />
            </form></div>);
    
        }

}