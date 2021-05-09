import {Component} from "react";
import "./PdfReader.css";

export default class PdfReader extends Component{

    constructor(props){
        super(props)
        this.state = {
            selectedDocument: ""
        }

    }

    render(){
        
        var selectedDoc = "../.." + this.props.document;

        if(selectedDoc !== "../.."){
            //alert("pdfReader received: " + selectedDoc);
            return( 
            
                <div className="readerBody">
                    <div className="readerTitle">
                        <h1>{this.props.document}</h1>
                    </div>
                    <div class="pdfReader">
                        <iframe title="PDF-Content" src={selectedDoc} width="900" height="800"/>
                    </div>
                </div>
        );

        }else{

            return(null);
        }
        

    }



}