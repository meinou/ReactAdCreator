import React, { Component } from 'react';
import DesktopPreview from './DesktopPreview';
import Validator from 'valid-url';
import './Creator.css';
import { Button } from 'reactstrap';
import adService from '../services/adService';
import UserPrevious from './UserPrevious';

class Creator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ad: {},
            effects: null,
            image_url : "",
            label: "",
            aid: null,
            show: false,
            isMobile: true,
        }
        this.ctaChangeHandler = this.ctaChangeHandler.bind(this);
        this.clickUrlChangeHandler = this.clickUrlChangeHandler.bind(this);
        this.imageUrlChangeHandler = this.imageUrlChangeHandler.bind(this);
        this.updateAdData = this.updateAdData.bind(this);
        this.getByUser = this.getByUser.bind(this);
        this.showClickHandler = this.showClickHandler.bind(this);

        this.setScriptDivRef = element => {
            console.log(element);
        };

        this.updateAd = this.updateAd.bind(this);
    }

    componentDidMount() {
        adService.getEffects()
            .then((response) => this.setState({ effects: response.data }))
            .catch(console.error);
            this.getByUser();
           
    }
    
    showClickHandler() {
        this.setState({ show: !this.state.show });
    }

    modeChangeHandler(mode) {
        this.setState({ isMobile: mode === 'mobile' });
    }

    effectsChangeHandler(i) {
       // console.log('this.state.effects', this.state.effects);
        if (this.state.effects) {
            this.state.effects[i].checked = !this.state.effects[i].checked;

            const ad = this.state.ad;
            ad.effects = this.state.effects.filter(element => element.checked);

            this.setState({ ad, effects: Array.prototype.slice.apply(this.state.effects) }, this.updateAd);
        }
    }

    ctaChangeHandler(event) {
        this.updateAdData('cta', event.target.value);
    }

    clickUrlChangeHandler(event) {
        this.updateAdData('clickUrl', event.target.value);
    }

    imageUrlChangeHandler(event) {
        this.updateAdData('imageUrl', event.target.value);
    }

    updateAdData(field, value) {
        const newAd = Object.assign({}, this.state.ad);
        newAd.userId = this.props.user.id;
        newAd[field] = value;
        this.setState({ ad: newAd, clicked: false }, this.updateAd);
        this.getByUser();
    }

    getByUser() {
        console.log("id" , this.props.user.id);
        return adService.getByUser(this.props.user.id)
                .then((response) => {
                    this.setState({userAds: response.data});
                })
    }

    updateAd() {
        if (!this.state.ad.imageUrl || !this.state.ad.clickUrl) {
            return;
        }

        const promise = this.state.ad.aid ? adService.putTo(this.state.ad.aid, this.state.ad) : adService.postTo(this.state.ad);

        promise
            .then((response) => {
                this.setState({ ad: response.data });
                console.log("after set state ", this.state.ad);  
            })
            .catch(console.error);
    }

    render() {
        console.log(this.state.ad.aid);
        return(<div className="container">
            <div className="row">
                <div className="col-sm-2">
                    <button className="btn btn-default logout" onClick={this.props.logout}>Log out</button>
                </div>
                <div className="col-sm-4">
                <div className="btn-group" role="group" aria-label="...">
                    <button className={"btn btn-info " + (this.state.isMobile ? " active" : "")} onClick={this.modeChangeHandler.bind(this, 'mobile')} >Mobile</button>
                    <button className={"btn btn-info " + (this.state.isMobile ? "" : "active")} onClick={this.modeChangeHandler.bind(this, 'desktop')}>Desktop</button>
                </div>
                </div>
                <div className="col-sm-4">
                    <button className="btn btn-info" onClick={this.showClickHandler}>Show all my ads</button>
                </div>
            </div>
            <div className="adForm row">
                <div className="col-sm-6 col-md-6">
                    <div className="form-group">
                        <label htmlFor="creatorCta">CTA</label>
                        <input id="creatorCta" className="form-control" type="text" value={this.state.ad.cta ? this.state.ad.cta : ''} onChange={this.ctaChangeHandler}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="creatorClick">Click url</label>
                        <input id="creatorClick" className="form-control" type="text" value={this.state.ad.clickUrl ? this.state.ad.clickUrl : ''} onChange={this.clickUrlChangeHandler}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="creatorImage">Image url</label>
                        <input id="creatorImage" className="form-control" type="text" value={this.state.ad.imageUrl ? this.state.ad.imageUrl : ''} onChange={this.imageUrlChangeHandler}/>
                    </div>
                </div>
                <div className="col-sm-6 col-md-6">
                    <h4>Choose effects</h4>
                    <div className="effects-list">
                    {this.state.effects ? this.state.effects.map((e, i) => <div key={i} className="form-check">
                        <label className="checkbox" htmlFor={'effectCheckbox' + i}>
                            <input type="checkbox" value={e.eid} checked={!!e.checked} onChange={this.effectsChangeHandler.bind(this, i)} />
                            {e.name}</label>
                    </div>) : null}
                    </div>
                </div>
            </div>
            
            {this.state.ad.aid ? <DesktopPreview aid={this.state.ad.aid}/> : ""}
            
            <div ref={this.setScriptDivRef}></div>

            {!!this.props.user && this.state.show ? <UserPrevious  ads={this.state.userAds}/> : ""}
        </div>);
    }
}

export default Creator;