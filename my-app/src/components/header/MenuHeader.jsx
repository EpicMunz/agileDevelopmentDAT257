import "antd/dist/antd.css";
import React, { Component } from "react";
import { Layout, Menu } from "antd";
import Map from "../map/InteractiveMap";
import BookingPane from "../bookingPage/BookingPageContainer.jsx";
import LogInPage from "../logInPage/LogInPage.jsx";
import AvailableLocations from "../availableLocations/AvailableLocations.jsx";
import AddAccountPage from "../adminAccountPage/AccountPage.jsx";
import ManageProfilePage from "../profilePage/ManageProfilePage.jsx";
import PdfReader from "../pdfReader/PdfReader.jsx";

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
        if(page === "Profile"){
            this.props.onDisplayChange(ManageProfilePage);
        }
        else if(page === "Map"){
            this.props.onDisplayChange(Map);
        }
        else if(page === "MyBookings"){
            this.props.onDisplayChange(BookingPane)
        }
        else if(page === "AvLoc"){
          this.props.onDisplayChange(AvailableLocations)
        }
        else if(page === "AddAccount"){
            this.props.onDisplayChange(AddAccountPage);
        }
        else if(page === "LogOut"){
			this.props.onDisplayChange(LogInPage);
        }
		else if(page === "PdfReader"){
			this.props.onDisplayChange(PdfReader);
		}
    }
    //If status of user is admin add AddAccountPage to header
    accountPageToHeader(){
    if(JSON.parse(sessionStorage.getItem("userData")).Status === "admin")
        return (<Menu.Item key = "AddAccount">
                              <a href="/#" onClick={() => this.handleClick("AddAccount")}>
                                Hantera användare
                              </a>
                            </Menu.Item>);
                            
    }
  render() {
    return (
      <Layout className="layout">
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["Map"]} >
            <img //Leftmost image, should be of the users program
              src={`${process.env.PUBLIC_URL}MKlogga.png`}
              className="imgBorder"
              width="60"
              height="55"
              alt="MKlogga"
            />
            
			<SubMenu key="Profile" title="Profil"> 
              	<Menu.ItemGroup key="g1" //Dropdown menu under "Profil"
              	>
					<Menu.Item key="Sub1User">
						<a href="/#" onClick={() => this.handleClick("Profile")}>
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

            <Menu.Item key="MyBookings">
                <a href="/#" onClick={() => this.handleClick("MyBookings")}>
                   	Mina Bokningar
                </a>
			</Menu.Item>

            <Menu.Item key="Map">
                <a href="/#" onClick={() => this.handleClick("Map")}>
                  	Karta
                </a></Menu.Item>

            <Menu.Item key = "AvLoc">
              	<a href="/#" onClick={() => this.handleClick("AvLoc")}>
                	Tillgängliga Lokaler
              	</a>
            </Menu.Item>

            <Menu.Item key = "PdfReader">
				<a href="/#" onClick={() => this.handleClick("PdfReader")}>
                	PdfReader
              	</a>
            </Menu.Item>

            {this.accountPageToHeader()}
          </Menu>
        </Header>
      </Layout>
    );
  }
}
