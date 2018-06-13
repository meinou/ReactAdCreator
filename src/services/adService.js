import axios from 'axios';

const adService = {};

//const baseUrl = 'http://localhost:8084';
const baseUrl = "http://localhost:8080/creator";
//const baseUrl = "process.env.REACT_APP_HOST:8080/creator"
//http://localhost:8080/creator/ads/users/1
//const baseUrl = 'http://ec2-18-188-3-4.us-east-2.compute.amazonaws.com:8080/creator' 
//const baseUrl = process.env.REACT_APP_HOST + '/creator';

adService.getEffects = () => {
    const url = `${baseUrl}/effects`;
    return axios.get(url);
}

adService.getByUser = (userId) => {
    const url = `${baseUrl}/ads/users/${userId}`
    return axios.get(url);
}

adService.getById = (aid) => {
    const url = `${baseUrl}/ads/${aid}`;
    return axios.get(url);
}

adService.getAds = () => {
    const url = `${baseUrl}/ads`;
    console.log("GETTING... ", url);
    return axios.get(url);
}

adService.postTo = (object) => {
   return axios.post(baseUrl,  object);
}

adService.putTo = (aid, object) => {
    const url = `${baseUrl}/ads/${aid}`;
    return axios.put(url,  object);
 }

export default adService;