import {Component} from "react";
import {fetchData} from "../clientFetch/ClientFetch";
import {Form, Input, Button, Item, Dropdown, Menu, Select} from "antd";
import { DownOutlined } from '@ant-design/icons';
import "./AccountPage.css";



//Component used for removing users
export default class RemoveAccountPage extends Component{
    constructor(props){
        super(props)
        this.state = {data: null};
    }

     componentDidMount = async() => {
          const api_call = await fetchData("/getAllUsers", []);
          const response = await api_call.json();
          this.setState({data: response});
      }

    componentWillReceiveProps(nextProps) {
        this.componentDidMount();
      }

    handleSelect =(e) =>{
        this.setState({name: e});
    }

    //Is called when submitting form
    handleSubmit(event) {
        //event.preventDefault();
        var data = {
            Username: this.state.name,
        }
        //Requests removing of user by username
        fetchData("/removeUser", data);
        alert("Användaren " + data.Username + " är borttagen");
        this.setState({name: null});
        this.props.onSubmit();
    }



    render()
    {

    const { Option } = Select;

        return this.state.data !== null ? (
        <div>
        <Form className="formPosition2" id="formdata" onFinish={(e) => this.handleSubmit(e)} >
        <h1 className="textPosition">Ta bort användare</h1>
        <Form.Item>
           <Select placeholder="Välj användare" onChange={this.handleSelect} value={this.state.name} className="selectPosition" required>
                                   { this.state.data.map((element) => (
                                     element.Status !== "admin" ? (
                                         <Option value={element.Username}>{element.Username} </Option>): (null)
                                   ))}
                                 </Select>
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit" className="buttonPosition2">
            Ta bort
            </Button>
        </Form.Item>
        </Form>
        </div>
        ): (null);
    }
}

/*<div className="rectangleAddAccount">
          <h3>Radera användare</h3>
          <form id="formdata" onSubmit={(e) => this.handleSubmit(e)}>
                    <label>
                      Användare:
                      <select onChange={(e) => this.handleSelect(e)}>
                        { this.state.data.map((element) => (
                          element.Status !== "admin" ? (
                              <option value={element.Username}>{element.Username} </option>): (null)
                        ))}
                      </select>
                    </label>
                    <input type="submit" value="Ta bort" />
                  </form></div>) : (null);
                  */