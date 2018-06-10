import axios from 'axios';

const services = {};

const baseUrl = 'http://localhost:8084';

services.getAds = () => {
    

    const url = `${baseUrl}/ads`;
    console.log("GETTING... ", url);
    return axios.get(url)
}

services.postTo = (object) => {
    // return axios({
    //     method: 'POST',
    //     url: `${baseUrl}`,
    //     data: {
    //         content: object.content
    //     }
    // })
   return  axios.post(baseUrl,  object)
    .then(res => {
      console.log("res----",res);
      console.log(res.data);
    })
}

export default services;