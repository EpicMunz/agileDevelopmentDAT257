import {Component} from "react";
import EditProfile from "./EditProfile.jsx";


export default class ManageProfileProfile extends Component{


    constructor(props){
        super(props)
        this.state = {action: false};
        this.actionHasBeenTaken = this.actionHasBeenTaken.bind(this);
    }

    actionHasBeenTaken(){
        this.setState({action: !this.state.action});
    }

    render(){
        return (<div>
            <EditProfile
                onSubmit={this.actionHasBeenTaken}
                />
        
        </div>)
    }

}
