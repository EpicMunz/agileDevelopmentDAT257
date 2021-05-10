import "antd/dist/antd.css";
import React, { Component } from "react";
import { Layout, Menu } from "antd";
import Map from "../map/InteractiveMap";
import BookingPageContainer from "../bookingPage/BookingPageContainer.jsx";
import LogInPage from "../logInPage/LogInPage.jsx";
import AvailableLocations from "../availableLocations/AvailableLocations.jsx";
import AddAccountPage from "../adminAccountPage/AccountPage.jsx";
import ManageProfilePage from "../profilePage/ManageProfilePage.jsx";
import PdfrPage from "../pdfReader/PdfrPage.jsx";

const { Header } = Layout;
const { SubMenu } = Menu;

export default class MenuHeader extends Component {

    constructor(props){
		super(props);
		var currentPage = JSON.parse(localStorage.getItem("page"));
		this.state = { page: currentPage, currentUser: "admin"};
	}
	//Changes the current page to the selected one in the header
    handleClick = (page) => {
        if(page === "ManageProfilePage"){
            this.props.onDisplayChange(ManageProfilePage);
        }
        else if(page === "InteractiveMap"){
            this.props.onDisplayChange(Map);
        }
        else if(page === "BookingPane"){
            this.props.onDisplayChange(BookingPageContainer)
        }
        else if(page === "AvailableLocations"){
          this.props.onDisplayChange(AvailableLocations)
        }
        else if(page === "AddAccountPage"){
            this.props.onDisplayChange(AddAccountPage);
        }
        else if(page === "LogOut"){
			this.props.onDisplayChange(LogInPage);
        }
		else if(page === "PdfrPage"){
			this.props.onDisplayChange(PdfrPage);
		}
    }
    //If status of user is admin add AddAccountPage to header
    accountPageToHeader(){
    if(JSON.parse(sessionStorage.getItem("userData")).Status === "admin")
        return (<Menu.Item key = "AddAccountPage">
                              <a href="/#" onClick={() => this.handleClick("AddAccountPage")}>
                                Hantera användare
                              </a>
                            </Menu.Item>);
                            
    }
  render() {
    return (
      <Layout className="layout">
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={this.state.page || "InteractiveMap"} >
            <img //Leftmost image, should be of the users program
              src={`${process.env.PUBLIC_URL}MKlogga.png`}
              className="imgBorder"
              width="60"
              height="55"
              alt="MKlogga"
            />
            
			<SubMenu key="ManageProfilePage" title="Profil">
              	<Menu.ItemGroup key="g1" //Dropdown menu under "Profil"
              	>
					<Menu.Item key="Sub1User">
						<a href="/#" onClick={() => this.handleClick("ManageProfilePage")}>
							Användare
						</a>
					</Menu.Item>

					<Menu.Item key="Sub1LogOut">
						<a href="/#" onClick={() => this.handleClick("LogOut")}>
							Logga ut
						</a>	
					</Menu.Item>
					
				</Menu.ItemGroup>
            </SubMenu>

            <Menu.Item key="BookingPane">
                <a href="/#" onClick={() => this.handleClick("BookingPane")}>
                   	Mina Bokningar
                </a>
			</Menu.Item>

            <Menu.Item key="InteractiveMap">
                <a href="/#" onClick={() => this.handleClick("InteractiveMap")}>
                  	Karta
                </a></Menu.Item>

            <Menu.Item key = "AvailableLocations">
              	<a href="/#" onClick={() => this.handleClick("AvailableLocations")}>
                	Tillgängliga Lokaler
              	</a>
            </Menu.Item>

            <Menu.Item key = "PdfrPage">
				<a href="/#" onClick={() => this.handleClick("PdfrPage")}>
                	PdfrPage
              	</a>
            </Menu.Item>

            {this.accountPageToHeader()}
          </Menu>
        </Header>
      </Layout>
    );
  }
}
