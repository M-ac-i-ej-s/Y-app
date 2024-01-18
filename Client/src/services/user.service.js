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

export const updateFollowers = async (login, user) => {
    try {
        const response = await axios.patch(API_URL + login + '/followers', {user}, {
            headers: authHeader(),
        })
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error; // You might want to handle errors appropriately in your component
    }
};

export const updateFollowing = async (login, user) => {
    try {
        const response = await axios.patch(API_URL + login + '/following', {user}, {
            headers: authHeader(),
        })
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error; // You might want to handle errors appropriately in your component
    }
};

export const updateBothFollow = async (login, user) => {
    const followers = await updateFollowers(login, user);
    const following = await updateFollowing(login, user);
    return {followers, following};
};

export const getAllFollowers = async (login) => {
    try {
        const response = await axios.get(API_URL + login + '/followers',{
            headers: authHeader(),
        })
    
        return response.data.Users;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error; // You might want to handle errors appropriately in your component
    }
};

export const getAllFollowing = async (login) => {
    try {
        const response = await axios.get(API_URL + login + '/following',{
            headers: authHeader(),
        })
    
        return response.data.Users;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error; // You might want to handle errors appropriately in your component
    }
};

export const updateBlockedUsers = async (login, user) => {
    try {
        const response = await axios.patch(API_URL + login + '/blockedUsers', {user}, {
            headers: authHeader(),
        })
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error; // You might want to handle errors appropriately in your component
    }
};

export const getAllBlockedUsers = async (login) => {
    try {
        const response = await axios.get(API_URL + login + '/blockedUsers',{
            headers: authHeader(),
        })
        return response.data.Users;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error; // You might want to handle errors appropriately in your component
    }
};

export const getUsersExplore = async (login, text, seenIds) => {
    try {
        const response = await axios.get(API_URL + login + '/search', {
            params: {
                q: text,
                seenIds: seenIds.join(','),
            },
            headers: {
                ...authHeader(),
                'Content-Type': 'application/json',
            },
        });
        return response.data.Users;
    } catch (error) {
        console.error('Error fetching user users:', error);
        throw error; // You might want to handle errors appropriately in your component
    }
};

export const checkIfUserExists = async (login) => {
    try {
        const response = await axios.get(API_URL + login + '/exists');
        return response.data.User;
    } catch (error) {
        console.error('Error fetching user users:', error);
        throw error; // You might want to handle errors appropriately in your component
    }
};

export const checkIfEmailExists = async (email) => {
    try {
        const response = await axios.get(API_URL + email + '/email');
        return response.data.User;
    } catch (error) {
        console.error('Error fetching user users:', error);
        throw error; // You might want to handle errors appropriately in your component
    }
};

export const checkIfPhoneExists = async (telNumber) => {
    try {
        const response = await axios.get(API_URL + telNumber + '/phone');
        return response.data.User;
    } catch (error) {
        console.error('Error fetching user users:', error);
        throw error; // You might want to handle errors appropriately in your component
    }
};

export const getSomeoneToFollow = async (login, seenIds) => {
    try {
        const response = await axios.get(API_URL + login + '/fiveFollow',{
            params: {
                seenIds: seenIds.join(','),
            },
            headers: {
                ...authHeader(),
                'Content-Type': 'application/json',
            },
        });
        return response.data.Users;
    } catch (error) {
        console.error('Error fetching user users:', error);
        throw error; // You might want to handle errors appropriately in your component
    }
}
