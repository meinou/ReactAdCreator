import React, { Component } from 'react';

class UserPrevious extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ads: []
        }
        
    }

    componentDidMount() {
        if (!this.props.ads) return;
         
    }

    componentWillUpdate(next) {
        if (!this.props.ads) return;
         console.log("next", next);
           if (next.ads.length != this.state.ads.length) 
           this.setState({ads: next.ads.slice()})
    }





    render() {
        console.log("props", this.state.ads);
        const list = !!this.state.ads ? 
        <div clasName="prev">
            {this.state.ads.map((ad) => {return( <div><img src={ad.image_url} /></div>)})}
        </div> : "";
        return (<div>{list}</div>)
    }
}

export default UserPrevious;