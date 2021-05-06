import {Component} from "react";
//import {fetchData} from "../clientFetch/ClientFetch";
import "./ManageProfilePage.jsx";

export default class EditProfile extends Component{

    constructor(props){
        super(props)
        this.state = { isActive: false,
            username: "", password: "", email: ""};
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        
    }


    //Changes state values when textfield changes
    handleChangePassword(e){
        this.setState({password: e.target.value});
    }
    handleChangeEmail(e){
        this.setState({email: e.target.value});
    }

    //Is called when saving form
   /* handleSave(event) {
        //event.preventDefault();
        var data = {
            Password: this.state.password,
            Mail: this.state.email
        }

        fetchData("/", data);
        alert("Password and Email saved.")
        this.props.onSubmit();
    }*/

    //Box of form
        render(){
            return (<div className="rectangleSave">
            <h3>Användarprofil</h3>
            <form id="saveform" onSubmit={(e) => this.handleSave(e)}>
                    <label>
                        Email:
                        <input type="text" name="name" onChange= {this.handleChangeEmail}/>
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" onChange= {this.handleChangePassword}/>
                    </label>
                    <input type="submit" value="Spara" />
            </form></div>);
    
        }

}