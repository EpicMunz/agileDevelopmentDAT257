import React, { Component } from "react";
import AvLocListItem from "./AvLocListItem";
import * as locations from "../../data/locations.json";
import { fetchData } from "../ClientFetch";

class AvLocPane extends Component {

    constructor(props) {
		super(props);
		this.state = {};
    }

    async getData(location) {

            var data = [{
                    Id: 1,
                    Location: location
                    }];
                    const response = await fetchData("/getSavedData", data);
                    const json = await response.json();
                    this.data = json;
                    this.setState({dataReceived: true}); //used to rerender view
    }

   /*  //Is called when object has been used before instead of constructor when passing props
    componentWillReceiveProps(nextProps){
        this.data = nextProps.data;
        this.setState(state => ({
                dataReceived: true
            }));
    }
*/

    render() {
    //Collects the data from localStorage that is linked to the specified location

        let validDate = true;

            return (

                
                
                <React.Fragment>
                    <div className="row" style={{ fontWeight: "bold", fontSize: "25px"  }}> {/* Top row containing three column titles Event, StartTid and SlutTid*/}
                        <div className="col">Lokal</div>
                        <div className="col">Datum</div>
                        <div className="col">Tid</div>
                        <div className="col"></div>
                    </div>

                    <tbody className="my-bookings-table" > {/* Table containing all appointments for a specified location for the current owner */}

                    
                    {/*{
                        locations.features.map((premises) => {
                            
                            return <h1>{premises.properties.NAME}</h1>;
                            
                            })
                    
                    }
                    }*/}

                   {
                
                        //will map an array with all existing locations
                        locations.features.map((premises) => {
                        
                            //Fetches all bookings from current location "premises"
                            //this.getData(premises.properties.NAME); //fetch into variable data
                            validDate = true;

                            //if(this.state.dataReceived){
                            
                                //will run through all the bookings of the current location
                                //for(var i = 0; i<this.data.length; i++){

                                let start = new Date("2021-04-20T13:00:00.000Z");//new Date(this.data[i].StartTime);
                                let end = new Date("2021-04-20T14:00:00.000Z");//new Date(this.data[i].EndTime);

                                let startInput = new Date("2021-04-20T11:00:00.000Z");
                                let endInput = new Date("2021-04-20T14:00:00.000Z");

                                //start = gammal  / 22:00   26
                                //end = gammal    / 02:00   27

                                //startInput = ny / 20:00   26                   
                                //endInput = ny   / 22:00   26
                                
                                if((startInput.getDate() <= start.getDate()) && (end.getDate() >= startInput.getDate())
                                && (endInput.getDate() <= start.getDate() && (end.getDate() >= endInput.getDate()))){
                                    
                                    if( 
                                        (startInput.getHours() <= start.getHours()) && (end.getHours() <= startInput.getHours())
                                        && (endInput.getHours() <= start.getHours() && (end.getHours() <= endInput.getHours()))){      
                                          
                                        

                                        }else{

                                            validDate = false;
                                            alert("hours fail at " + premises.properties.NAME + ", " + start + ", " + end);
                                            //break;
        
                                        }

                                }else{

                                    validDate = false;
                                    alert("hours fail at " + premises.properties.NAME + ", " + start + ", " + end);
                                   // break;

                                }

                            

                            if(validDate){

                                alert("ok");
                                return <h1>{premises.properties.NAME}</h1>

                            }

                       // }else{



                      //  }
                    
                    })

                       
                }

                        
                </tbody>


                </React.Fragment>
            );
    }

}


export default AvLocPane;
