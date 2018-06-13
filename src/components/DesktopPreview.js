import React, { Component } from 'react';
import './Preview.css';


class DesktopPreview extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        if (window.destroyAds) {
            window.destroyAds();
        }
        if (window.findAds) {
            window.findAds();
        }
    }

    render() {
        return(<div className="preview">
            {this.props.showAll ? this.props.ads.map((ad, i) => <div key={i}>
                <div className="content"></div>
                <div data-ad={ad.aid}></div>
                <div className="content"></div>
                <div className="content"></div>
                <div className="content"></div>
            </div>):
            <div>
                <div className="content"></div>
                <div data-ad={this.props.aid}></div>
                <div className="content"></div>
                <div className="content"></div>
                <div className="content"></div>
                <div className="content"></div>
            </div>
            }
        </div>);
    }
}

export default DesktopPreview;