import React, { Component } from 'react';

class DesktopPreview extends Component {
    constructor(props) {
        super(props);  

    }

    render() {
       window.findAds();
        return(<div>here
            <div data-ad={this.props.aid}></div>
        </div>);
    }
}

export default DesktopPreview;