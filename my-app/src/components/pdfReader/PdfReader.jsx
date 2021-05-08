import {Component} from "react";
import locationInfo from './locationInfo.json';
import "./PdfReader.css";

export default class PdfReader extends Component{

    constructor(props){
        super(props)
        this.state = {
            displayPDF: ""
            
        }

    }

    togglePDF = (e) => {
            
        this.setState({displayPDF: "../.." + locationInfo[e].path});

    }

    render(){

        return(

            <div>
                <div class="title">
                    <h1>{this.state.displayPDF}</h1>
                    <button onClick={() => this.togglePDF(0)} > CS-bastun </button>
                    <button onClick={() => this.togglePDF(1)} > Bifilm </button>
                </div>
                <div class="pdfReader">
                    <iframe title="PDF-Content" src={this.state.displayPDF} width="900" height="800"/>
                </div>
            </div>

        );

    }



}