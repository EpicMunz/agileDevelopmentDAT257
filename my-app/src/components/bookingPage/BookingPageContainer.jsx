import React, { Component } from "react";
import { Layout, Menu } from "antd";
import "./BookingPageContainer.css";
import BookingPane from "./BookingPane";

const { Content, Sider } = Layout;

export default class BookingPageContainer extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h1 className="display-1">Mina Bokningar</h1>
        <Layout>
          <Sider
            className="site-layout-background"
            breakpoint={"lg"}
            theme="light"
            trigger={null}
          >
            <Menu
              style={{ height: "100%", borderRight: 0 }}
              defaultSelectedKeys={["1"]}
              mode="inline"
            >
              <Menu.Item key="1">Geniknölen</Menu.Item>
              <Menu.Item key="2">Kemigården</Menu.Item>
              <Menu.Item key="3">Vasaparken</Menu.Item>
              <Menu.Item key="4">Deltaparken</Menu.Item>
            </Menu>
          </Sider>
          <Content
            className="site-layout-background"
            style={{ padding: 24, margin: 0 }}
          >
            <BookingPane />
          </Content>
        </Layout>
      </React.Fragment>
    );
  }
}
