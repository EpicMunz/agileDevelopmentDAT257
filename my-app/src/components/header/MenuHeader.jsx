import "antd/dist/antd.css";
import React, { Component } from "react";
import { Layout, Menu } from "antd";
import Map from "../map/InteractiveMap";
import BookingPane from "../bookingPage/BookingPageContainer.jsx";
import LogInPage from "../logInPage/LogInPage.jsx";
import AvailableLocations from "../availableLocations/AvailableLocations.jsx";
import AddAccountPage from "../adminAccountPage/AccountPage.jsx";

const { Header } = Layout;
const { SubMenu } = Menu;

export default class MenuHeader extends Component {

    constructor(props){
		super(props);
		this.state = { page: LogInPage, currentUser: "admin"};
		this.handleClick = this.handleClick.bind(this);
	}
	//Changes the current page to the selected one in the header
    handleClick(page){
        if(page === "map"){
            this.props.onDisplayChange(Map);
        }
        else if(page === "minabokningar"){
            this.props.onDisplayChange(BookingPane)
        }
        else if(page === "available"){
          this.props.onDisplayChange(AvailableLocations)
        }
        else if(page === "AddAccount"){
            this.props.onDisplayChange(AddAccountPage);
        }
    }
    //If status of user is admin add AddAccountPage to header
    accountPageToHeader(){
    if(JSON.parse(sessionStorage.getItem("userData")).Status === "admin")
        return (<Menu.Item key = "4">
                              <a href="/#" onClick={() => this.handleClick("AddAccount")}>
                                Hantera användare
                              </a>
                            </Menu.Item>);
    }
  render() {
    return (
      <Layout className="layout">
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <img //Leftmost image, should be of the users program
              src={`${process.env.PUBLIC_URL}MKlogga.png`}
              className="imgBorder"
              width="60"
              height="55"
              alt="sektionslogga"
            />
            <SubMenu key="sub1" title="Profil"> 
              <Menu.ItemGroup key="g1" //Dropdown menu under "Profil"
              >
                <Menu.Item key="3">Användare</Menu.Item>
                <Menu.Item key="4">Logga ut</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            <Menu.Item key="1">
                <a href="/#" onClick={() => this.handleClick("minabokningar")}>
                   Mina Bokningar
                </a></Menu.Item>
            <Menu.Item key="2">
                <a href="/#" onClick={() => this.handleClick("map")}>
                  Karta
                </a></Menu.Item>
            <Menu.Item key = "3">
              <a href="/#" onClick={() => this.handleClick("available")}>
                Tillgängliga Lokaler
              </a>
            </Menu.Item>
            {this.accountPageToHeader()}
          </Menu>
        </Header>
      </Layout>
    );
  }
}
