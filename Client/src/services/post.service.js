import axios from "axios";
import authHeader from "./auth-header";
const API_URL = 'http://localhost:3001/posts/';

export const getUsersPosts = async (login) => { 
    try {
        const response = await axios.get(API_URL + login,
        {
            headers: authHeader(),
        }
        );
    
        return response.data.Posts;
    } catch (error) {
        console.error('Error fetching user posts:', error);
        throw error; // You might want to handle errors appropriately in your component
    }
}

export const createPost = async (text, login) => {
    await axios.post(API_URL, 
            {
                    text: text,
                    login: login,
            },   
            {
                headers: {
                    ...authHeader(),
                    'Content-Type': 'application/json',
                },
            },
            ).then((response) => {
                return response.data.Post;
            }).catch((error) => {
                console.log(error);
            });
}

export const deletePost = async (id) => {
    await axios.delete(API_URL + id, {
        headers: authHeader(),
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(error);
    });
}

export const likePost = async (id, login) => {
    await axios.patch(API_URL + id + '/likePost', {login}, {
        headers: authHeader(),
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(error);
    });
}

export const getAllLikedPosts = async (login) => {
    try {
        const response = await axios.get(API_URL + login + '/likedPosts', {
            headers: authHeader(),
        });
        return response.data.Posts;
    } catch (error) {
        console.error('Error fetching user posts:', error);
        throw error; // You might want to handle errors appropriately in your component
    }
};

export const savePost = async (id, login) => {
    await axios.patch(API_URL + id + '/savePost', {login}, {
        headers: authHeader(),
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(error);
    });
};

export const getAllSavedPosts = async (login) => {
    try {
        const response = await axios.get(API_URL + login + '/savedPosts', {
            headers: authHeader(),
        });
        return response.data.Posts;
    } catch (error) {
        console.error('Error fetching user posts:', error);
        throw error; // You might want to handle errors appropriately in your component
    }
};