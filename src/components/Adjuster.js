import React, { Component } from 'react';
import services from '../services/adService';
import axios from 'axios';

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
            console.log("norm");
            console.log("resp ", response);
        })
        .catch((err) => console.log(err));


    }

    render() {
        const ad = {
            "effects": [
            {
            "eid": 1,
            "name": "fade"
            }
            ],
            "cta": "hello, goat",
            "imageUrl": "https://cms.marketplace.org/sites/default/files/styles/primary-image-400x222/public/82781157.jpg",
            "clickUrl": "http://instagram.com/mentret",
            "userId": 1
            }
        this.createAd(ad);
     //   this.getAllAds();
       // console.log("url",this.props.url);
        return(<div>Adjust</div>);
    }
}

export default Adjuster;