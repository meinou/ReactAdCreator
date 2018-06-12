import React, { Component } from 'react';
import services from '../services/adService';

class Adjuster extends Component {
    constructor(props) {
        super(props);  
        this.getAllAds.bind(this);
        this.createAd.bind(this);
    }

    getAllAds() {
        services.getAds()
        .then((response) => {
            console.log(response.data);
        })
        .catch(((err) => console.log(err))); 
    }

    createAd(ad) {
        services.postTo(ad)
        .then((response) => {
            console.log("resp ", response);
        })
        .catch((err) => console.log(err));
    }



    render() {
        return(<div>
            <img src={this.props.url} />
        </div>);
    }
}

export default Adjuster;