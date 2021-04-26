import React, { Component } from "react";
import { Layout, Menu } from "antd";
import "./BookingPageContainer.css";
import BookingPane from "./BookingPane";
import {fetchData} from "../ClientFetch";
import Schedule from "../Schedule";

const { Content, Sider } = Layout;
//Structure: BookingPageContainer -> BookingPane -> BookingListItem
export default class BookingPageContainer extends Component {

  constructor(props){
  		super(props);
  		this.state = {location: null, data: [], locations: []}
  		this.locations = [];
  		this.handleClick = this.handleClick.bind(this);
  		this.getData();
  	}
  //Saves the new location in location state
  handleClick(newLocation){
    this.setState(state => ({
        location: newLocation
    }));
    this.locations = [];

  }
  //Adds a location the locations array
  addLocation(location){
    this.locations.push(location);
  }
  componentWillReceiveProps(nextProps){
    this.getData();
  }
  //Requests my bookings data from server
  async getData(){
      var data = [{
          Owner: JSON.parse(sessionStorage.getItem("userData")).Username
      }];
      var receivedData = await fetchData("/getMyBookings", data);
      var jsonData = await receivedData.json();
      this.setState(state => ({
              data: jsonData
      }));
  }
  //returns a schedule component with linked props
  render() {
    return (<div>
                   <Schedule
                     onDisplayChange={this.displayChangePage}
                     onLocationChange={this.changeLocation}
                     location= {this.state.location}
                     data = {this.state.data}
                   />
                 </div>);

    /*
    return (
      <React.Fragment>
        <h1 className="display-1">Mina Bokningar</h1>
        <Layout>
          <Sider //Some styling for the menu
            className="site-layout-background"
            breakpoint={"lg"}
            theme="light"
            trigger={null}
          >
            <Menu // The menu contains the different locations as items
              style={{ height: "100%", borderRight: 0 }}
              defaultSelectedKeys={["0"]}
              mode="inline"
              className = "my-bookings"
            >{
                this.state.data.map((element, i) =>{
                    if(this.locations.indexOf(element.Location) < 0){
                        this.addLocation(element.Location);
                        return <Menu.Item key={i}>
                                    <a onClick={() => this.handleClick(element.Location)}>
                                        {element.Location}
                                    </a>
                               </Menu.Item>;
                    }
                })
            }
            </Menu>
          </Sider>
          <Content
            className="site-layout-background"
            style={{ padding: 24, margin: 0 }}
          >
            <BookingPane
            location = {this.state.location}
            data = {this.state.data}
            />
          </Content>
        </Layout>
      </React.Fragment>
    );
    */
  }
}
