import React, { Component } from "react";
import { Layout, Menu, Divider } from "antd";
import "./BookingPageContainer.css"

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class BookingPageContainer extends Component {
  state = {};
  render() {
    return (
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
        <Content className="site-layout-background" style={{ padding: 24, margin: 0 }}>
          <div className="row" style={{fontWeight: "bold"}}>
              <div className="col">Event</div>
              <div className="col">Datum</div>
              <div className="col">Tid</div>
          </div>
          <Divider />
        </Content>
      </Layout>
    );
  }
}
