import "antd/dist/antd.css";
import React, { Component } from "react";
import { Layout, Menu} from "antd";

const { Header } = Layout;
const { SubMenu } = Menu;

export default class MenuHeader extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <img
              src={`${process.env.PUBLIC_URL}indek.png`}     
              width="50"
              height="50"

              alt = "sektionslogga"
            />
            <SubMenu key="sub1"  title="Profil"> 
              <Menu.ItemGroup key="g1">
              <Menu.Item key="3">Användare</Menu.Item>
              <Menu.Item key="4">Logga ut</Menu.Item>
          </Menu.ItemGroup>
            </SubMenu>
            <Menu.Item key="1">Startsida</Menu.Item>
            <Menu.Item key="2">Karta</Menu.Item>
          </Menu>
        </Header>
      </Layout>
    );
  }
}
