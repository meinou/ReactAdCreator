import React, { Component } from 'react';

class MobilePreview extends Component {
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
        return(
        <div className="phone-container preview">
        <div className="txt">iPhone X</div>
        <div className="blurBackground"></div>
        <div className="phone">
          <div className="toggleButton Button"></div>
          <div className="volumeButtonUp Button"></div>
          <div className="volumeButtonDown Button"></div>
          <div className="powerButton Button"></div>
          
          <div className="glares">
            <div className="horizontalGlare">
              <div className="glare1"></div>
            </div>
      
            <div className="verticalGlare">
              <div className="glare2"></div>
            </div>
          </div>
          
          <div className="screen">
                <div className="ad-screen-wrap">
                    <div>
                        {this.props.showAll ? this.props.ads.map((ad, i) => <div key={i}>
                            <div className="content"></div>
                            <div className="content"></div>
                            <div data-ad={ad.aid}></div>
                            <div className="content"></div>
                            <div className="content"></div>
                            <div className="content"></div>
                        </div>):
                        <div>
                            <div className="content"></div>
                            <div className="content"></div>
                            <div data-ad={this.props.aid}></div>
                            <div className="content"></div>
                            <div className="content"></div>
                            <div className="content"></div>
                        </div>
                        }
                    </div>
                </div>
            <div className="signal">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
           
            <div className="strip">
              
              <div className="circleHolder"><div className="circle1"></div><div className="circle2"></div>  
              </div>
              
              <div className="stripItems">
                <div className="camera"></div>
                <div className="camera second"></div>
                
                <div className="speaker"></div>
                <div className="prox ir"></div>
                <div className="prox"></div>
              </div>
              
            </div>
            
            <div className="batteryBar">
              <div className="batter"><div className="e"></div></div>100%
            </div>
        </div>
        </div>
    </div>);
    }
}

export default MobilePreview;