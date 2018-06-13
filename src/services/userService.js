import axios from 'axios';

const userService = {};

const baseUrl = 'http://localhost:8080/users/users'
//const baseUrl = "process.env.REACT_APP_HOST:8080/users/users";

userService.getByName = (userName) => {
    const url = `${baseUrl}/login/${userName}`;
    return axios.get(url);
}

userService.getAll = () => {
    return axios.get(baseUrl);
}

userService.createUser = (user) => {
    return axios.post(baseUrl, user);
}

export default userService;