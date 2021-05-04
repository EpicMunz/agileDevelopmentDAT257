import react, {Component} from "react";
import {fetchData} from "../ClientFetch";
import "./AccountPage.css";

//Component used for removing users
export default class RemoveAccountPage extends Component{



    constructor(props){
        super(props)
        this.state = {data: null};


    }
    async componentDidMount() {

          const api_call = await fetchData("/getAllUsers", []);
          const response = await api_call.json();
          this.setState({data: response});

      }
    componentWillReceiveProps(nextProps) {
        this.componentDidMount();
      }

    handleSelect(e){
        this.setState({name: e.target.value});
    }

    //Is called when submitting form
    handleSubmit(event) {
        event.preventDefault();
        var data = {
            Username: this.state.name,
        }
        //Requests removing of user by username
        fetchData("/removeUser", data);
        alert("Removed user " + data.Username);
        this.props.onSubmit();

    }


    render(){
        return this.state.data != null ? (<div className="rectangle">
        <h3>Remove User</h3>
        <form id="formdata" onSubmit={(e) => this.handleSubmit(e)}>
                  <label>
                    User:
                    <select onChange={(e) => this.handleSelect(e)}>
                      { this.state.data.map((element) => (
                        element.Status != "admin" ? (
                            <option value={element.Username}>{element.Username} </option>): (null)
                      ))}
                    </select>
                  </label>
                  <input type="submit" value="Remove User" />

                </form></div>) : (null);


    }


}