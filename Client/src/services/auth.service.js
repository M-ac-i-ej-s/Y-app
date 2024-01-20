import axios from 'axios';
const API_URL = 'http://localhost:3001/auth/';

export const register = (login, email, telNumber, password, bio, avatar ) => {
    const formData = new FormData();
    formData.append('login', login);
    formData.append('email', email);
    formData.append('telNumber', telNumber);
    formData.append('password', password);
    formData.append('bio', bio);
    formData.append('avatar', avatar);
    return axios
        .post(API_URL + 'register', formData)
        .then((response) => {
            return response.data;
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