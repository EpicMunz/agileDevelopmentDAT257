import React, { Component } from "react";
import { Layout, Menu } from "antd";
import "./BookingPageContainer.css";
import BookingPane from "./BookingPane";

const { Content, Sider } = Layout;
//Structure: BookingPageContainer -> BookingPane -> BookingListItem
export default class BookingPageContainer extends Component {
  state = {};
  /*
  Some pseudocode for how this could work (when its not hard coded):
  1.Get the title of the menu item (probably via its key)
  2.Pass this as a string to the bookingPane, call it maybe selectedLocation
  3.The bookingPane parses the JSON file as:
     this.section (ex "Nollkit")->selectedLocation->bookings[i]->event,date,time etc...
  */
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
              defaultSelectedKeys={["geniknölen"]}
              mode="inline"
            >
              <Menu.Item key="geniknölen">Geniknölen</Menu.Item>
              <Menu.Item key="kemigården">Kemigården</Menu.Item>
              <Menu.Item key="vasaparken">Vasaparken</Menu.Item>
              <Menu.Item key="deltaparken">Deltaparken</Menu.Item>
            </Menu>
          </Sider>
          <Content
            className="site-layout-background"
            style={{ padding: 24, margin: 0 }}
          >
            <BookingPane //The bookings are shown in the BookingPane
            />
          </Content>
        </Layout>
      </React.Fragment>
    );
  }
}
