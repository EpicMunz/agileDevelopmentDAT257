import {Component} from "react";
import locationInfo from './locationInfo.json';
import PdfrItem from './PdfrItem.jsx';
import './PdfrContainer.css';

export default class PdfrContainer extends Component{

    constructor(props){
        super(props)
        this.state = {}
    }

    itemCallback(docpath){
        //alert("docpath in container: " + docpath);
        this.props.updatePage(docpath);
    }

    render(){

        if(this.props.display === true){

            return(
                <>
                <div className="itemArea">
                <PdfrItem 
                    docname="Filnamn"
                    location="Lokal"
                    doctype="Filtyp"
                    isDocument={false} 
                />
                {   //Need to use map over forEach since map can return our elements
                    
                    
                    
                    locationInfo.map(ele => {
                        return(
                            <PdfrItem 
                                docname={ele.name}
                                location={ele.location}
                                doctype={ele.doctype}
                                path={ele.path}
                                updateContainer={this.itemCallback.bind(this)}  
                                isDocument={true}        
                            />
                        );        
                    }) 
                }
                </div>
                </>
            );

        }else{

            return(null);
        }
        

    }



}