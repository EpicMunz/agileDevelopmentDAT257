import React, { Component } from "react";
import { Layout, Menu} from "antd";
import AvLocPane from "./AvLocPane.jsx";
const { Content, Sider } = Layout;


export default class AvailableLocations extends Component {
	constructor(props) {
		super(props);
		this.state = { location: null, data: [], locations: [] };
  	}

	//returns a schedule component with linked props
	render() {
		return (
			<React.Fragment>
			  <h1 className="display-1">Tillgängliga lokaler</h1>
			  <h2>Du sökte på: 15-17 </h2>
			  <Layout>
				  <Menu // The menu contains the different locations as items
					style={{ height: "100%", borderRight: 0 }}
					defaultSelectedKeys={["0"]}
					mode="inline"
					className = "my-bookings"
				  >{
					  this.state.data.map((element, i) =>{
						  if(this.locations.indexOf(element.Location) < 0){
							  this.addLocation(element.Location);
							  return <Menu.Item key={i}>
										  <a onClick={() => this.handleClick(element.Location)}>
											  {element.Location}
										  </a>
									 </Menu.Item>;
						  }
					  })
				  }
				  </Menu>
				<Content
				  className="site-layout-background"
				  style={{ padding: 24, margin: 0 }}
				>
				  <AvLocPane
				  location = {this.state.location}
				  data = {this.state.data}
				  />
				</Content>
			  </Layout>
			</React.Fragment>
		  );
	}
}
