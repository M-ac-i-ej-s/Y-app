import axios from "axios";
import authHeader from "./auth-header";
const API_URL = 'http://localhost:3001/posts/';

export const getUsersPosts = async (id) => { 
    try {
        const response = await axios.get(API_URL + id,
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

export const createPost = async (text) => {
    await axios.post(API_URL, 
            {
                    text: text,
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
