import React, { Component } from "react";
import { Layout, Menu } from "antd";

const { SubMenu } = Menu;

export default class BookingPageContainer extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <h1>Title</h1>
        <Layout.Sider
          className="sidebar"
          breakpoint={"lg"}
          theme="light"
          trigger={null}
        >
          <Menu
            style={{ width: 256 }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
          >
            <Menu.Item key="1">Geniknölen</Menu.Item>
            <Menu.Item key="2">Kemigården</Menu.Item>
            <Menu.Item key="3">Vasaparken</Menu.Item>
            <Menu.Item key="4">Deltaparken</Menu.Item>
          </Menu>
        </Layout.Sider>
      </div>
    );
  }
}
