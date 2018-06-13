import React, { Component } from 'react';

class UserPrevious extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ads: !!this.props.ads ? [...this.props.ads] : []
        }
        
    }

    componentDidMount() {
        if (!!this.props.ads)
            this.setState({ads:[...this.props.ads]})
         
    }

    componentWillUpdate(next) {
        if (!this.props.ads) return;
         console.log("next", next);
           if (next.ads.length != this.state.ads.length) 
           this.setState({ads:[...next.ads]})
    }


    render() {
        window.findAds();
        console.log("ads", this.state.ads);
        const list = !!this.state.ads ? 
            <div className="footer prev">
                {this.state.ads.map((ad) => {return( <div data-ad={ad.aid}></div>)})}
            </div> : "";
        return (<div>{list}</div>)
    }
}

export default UserPrevious;