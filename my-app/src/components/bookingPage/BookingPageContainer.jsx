import React, { Component } from "react";
import { Layout, Menu } from "antd";
import "./BookingPageContainer.css";
import BookingPane from "./BookingPane";

const { Content, Sider } = Layout;
//Structure: BookingPageContainer -> BookingPane -> BookingListItem
export default class BookingPageContainer extends Component {
  state = {};
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
