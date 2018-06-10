import React, { Component } from 'react';
import Adjuster from './Adjuster';
import Validator from 'valid-url';
import './Creator.css';
import {Button} from 'reactstrap';

class Creator extends Component {
    constructor() {
        super();
        this.state = {
            image_url : "",
            label: ""
        }
        this.clickHandler = this.clickHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    clickHandler(event) {
        if (Validator.isUri(this.state.image_url)) //console.log("yes");
        //else console.log("No");
        this.setState({image_url: this.state.image_url, clicked: true});
        else this.setState({label: "Input valid url"});
        console.log(this.state.image_url);
        
    }

    changeHandler(event) {
        // newState = {
        //     image_url: event.target.value
        // }
        // if (clicked) {
        //     newState.add({clicked: false})
        // }
        // console.log(newState)
        this.setState({image_url: event.target.value, clicked: false});
        console.log(this.state.image_url);
    }


    render() {
        return(<div>
            <input type="text" value={this.state.image_url} onChange={this.changeHandler}/>
            <Button  onClick={this.clickHandler}>Submit</Button>
            {this.state.clicked? <Adjuster url={this.state.image_url} /> : <div>{this.state.label}</div>}
        </div>);
    }
}

export default Creator;