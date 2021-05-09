import {Component} from "react";
import locationInfo from './locationInfo.json';
import "./PdfReader.css";
import PdfrItem from './PdfrItem.jsx';
import { Divider, Button } from "antd";

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
                    <Button type="primary" onClick={() => this.togglePDF(0)} > CS-bastun </Button>
                    <Button type="primary" onClick={() => this.togglePDF(1)} > Bifilm </Button>
                    <PdfrItem/>
                </div>
                <div class="pdfReader">
                    <iframe title="PDF-Content" src={this.state.displayPDF} width="900" height="800"/>
                </div>
            </div>

        );

    }



}