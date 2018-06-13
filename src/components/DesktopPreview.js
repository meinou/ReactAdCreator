import React, { Component } from 'react';
import './Preview.css';


class DesktopPreview extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        // if (window.destroyAds) {
        //     window.destroyAds();
        // }
        // if (window.findAds) {
        //     window.findAds();
        // }
    }

    render() {
        return(<div className="preview">
            <div className="content"></div>
            <div data-ad={this.props.aid}></div>
            <div className="content"></div>
            <div className="content"></div>
        </div>);
    }
}

export default DesktopPreview;