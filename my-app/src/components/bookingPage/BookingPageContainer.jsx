import React, { Component } from "react";
import { Layout, Menu } from "antd";
import "./BookingPageContainer.css";
import BookingPane from "./BookingPane";

const { Content, Sider } = Layout;
//Structure: BookingPageContainer -> BookingPane -> BookingListItem
export default class BookingPageContainer extends Component {

  constructor(props){
  		super(props);
  		this.state = {location: null}
  		this.handleClick = this.handleClick.bind(this);
  	}
  //Saves the new location
  handleClick(newLocation){
    this.setState(state => ({
        location: newLocation
    }));
  }
  render() {
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
            >
              <Menu.Item key="1">
                  <a onClick={() => this.handleClick("Geniknölen")}>
                    GeniKnölen
                  </a></Menu.Item>
              <Menu.Item key="2">
                  <a onClick={() => this.handleClick("Kemigården")}>
                    Kemigården
                 </a></Menu.Item>
              <Menu.Item key="3">
                  <a onClick={() => this.handleClick("Vasaparken")}>
                    Vasaparken
                 </a></Menu.Item>
              <Menu.Item key="4">
                  <a color="green" onClick={() => this.handleClick("Deltaparken")}>
                    Deltaparken
                 </a></Menu.Item>
            </Menu>
          </Sider>
          <Content
            className="site-layout-background"
            style={{ padding: 24, margin: 0 }}
          >
            <BookingPane
            location = {this.state.location}
            />
          </Content>
        </Layout>
      </React.Fragment>
    );
  }
}
