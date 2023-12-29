import axios from "axios";
import authHeader from "./auth-header";
const API_URL = 'http://localhost:3001/users/';

export const getUser = async (login) => {
    try {
        const response = await axios.get(API_URL + login,{
            headers: authHeader(),
        })
    
        return response.data.User;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error; // You might want to handle errors appropriately in your component
    }
}

export const updateUser = async (id, data) => {
    try {
        const response = await axios.put(API_URL + id, data,{
            headers: authHeader(),
        })
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error; // You might want to handle errors appropriately in your component
    }
};

export const updateLikedPosts = async (login, id) => {
    try {
        const response = await axios.patch(API_URL + login + '/likedPosts', {id}, {
            headers: authHeader(),
        })
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error; // You might want to handle errors appropriately in your component
    }
};

export const updateSavedPosts = async (login, id) => {
    try {
        const response = await axios.patch(API_URL + login + '/savedPosts', {id}, {
            headers: authHeader(),
        })
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error; // You might want to handle errors appropriately in your component
    }
}

export const updatePosts = async (login, id) => {
    try {
        const response = await axios.patch(API_URL + login + '/posts', {id}, {
            headers: authHeader(),
        })
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error; // You might want to handle errors appropriately in your component
    }
};
