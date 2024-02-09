import axios from 'axios';
const API_URL = `https://${window.location.hostname}:3001/api/auth/`;

export const register = (login, email, telNumber, password, bio, avatar ) => {
    const formData = new FormData();
    formData.append('login', login);
    formData.append('email', email);
    formData.append('telNumber', telNumber);
    formData.append('password', password);
    formData.append('bio', bio);
    formData.append('images', avatar);
    formData.append('images', '');
    return axios
        .post(API_URL + 'register', formData)
        .then((response) => {
            return response.data;
        })
        .catch(err => {
            console.log(err)
        });
};

export const login = (email, password, params='') => {
    return axios
        .post(API_URL + 'login' + params, {
            email,
            password,
        })
        .then((response) => {
            return response.data;
        });
};