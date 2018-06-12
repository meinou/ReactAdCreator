import React, { Component } from 'react';
import Adjuster from './Adjuster';
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
            aid: null
        }
        this.ctaChangeHandler = this.ctaChangeHandler.bind(this);
        this.clickUrlChangeHandler = this.clickUrlChangeHandler.bind(this);
        this.imageUrlChangeHandler = this.imageUrlChangeHandler.bind(this);
        this.updateAdData = this.updateAdData.bind(this);
        this.getByUser = this.getByUser.bind(this);

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


    effectsChangeHandler(i) {
        console.log('this.state.effects', this.state.effects);
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
                console.log('response: ', response)

                this.setState({ ad: response.data });

                console.log("after set state ", this.state.ad);  
            })
            .catch(console.error);
    }

    render() {
        console.log(this.state.userAds);
        return(<div>
            <div className="adForm">
                <div>
                    <label>CTA</label>
                    <input type="text" value={this.state.ad.cta ? this.state.ad.cta : ''} onChange={this.ctaChangeHandler}/>
                </div>
                <div>
                    <label>Click url</label>
                    <input type="text" value={this.state.ad.clickUrl ? this.state.ad.clickUrl : ''} onChange={this.clickUrlChangeHandler}/>
                </div>
                <div>
                    <label>Image url</label>
                    <input type="text" value={this.state.ad.imageUrl ? this.state.ad.imageUrl : ''} onChange={this.imageUrlChangeHandler}/>
                </div>
                <Button  onClick={this.clickHandler}>Submit</Button>
                {this.state.clicked? <Adjuster url={this.state.ad.imageUrl} /> : <div>{this.state.label}</div>}
            </div>
            <div>
                <span>Choose effects</span>
                <div>
                {this.state.effects ? this.state.effects.map((e, i) => <div key={i} className="checkbox">
                    <label>
                        <input type="checkbox" value={e.eid} checked={!!e.checked} onChange={this.effectsChangeHandler.bind(this, i)} />{e.name}
                    </label>
                </div>) : null}
                </div>
            </div>

            <div ref={this.setScriptDivRef}></div>
            {!!this.props.user ? <UserPrevious ads={this.state.userAds}/> : ""}
        </div>);
    }
}

export default Creator;