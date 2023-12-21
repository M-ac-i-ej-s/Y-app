import axios from 'axios';
const API_URL = 'http://localhost:3001/auth/';

export const register = (login, email, telNumber, password, bio, avatar ) => {
    return axios
        .post(API_URL + 'register', {
            login,
            email,
            telNumber,
            password,
            bio,
            avatar,
        })
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