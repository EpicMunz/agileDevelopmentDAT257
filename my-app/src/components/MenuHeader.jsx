import "antd/dist/antd.css";
import React, { Component } from "react";
import { Layout, Menu } from "antd";
import Map from "./InteractiveMap";
import BookingPane from "./bookingPage/BookingPageContainer.jsx";
import LogInPage from "./LogInPage";

const { Header } = Layout;
const { SubMenu } = Menu;


export default class MenuHeader extends Component {

    constructor(props){
		super(props);
		this.state = { page: LogInPage};
		this.handleClick = this.handleClick.bind(this);
	}
	//Changes the current page to the selected one in the header
    handleClick(page){
        if(page == "map"){
            this.props.onDisplayChange(Map);
        }
        else if(page == "minabokningar"){
            this.props.onDisplayChange(BookingPane)
        }
    }
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <img //Leftmost image, should be of the users program
              src={`${process.env.PUBLIC_URL}finlogga.png`}
              width="140"
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
                <a onClick={() => this.handleClick("minabokningar")}>
                   Mina Bokningar
                </a></Menu.Item>
            <Menu.Item key="2">
                <a onClick={() => this.handleClick("map")}>
                  Karta
                </a></Menu.Item>
          </Menu>
        </Header>
      </Layout>
    );
  }
}
