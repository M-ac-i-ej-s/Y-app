import axios from "axios";
import authHeader from "./auth-header";
const API_URL = 'http://localhost:3001/posts/';

export const getUsersPosts = async () => {
    await axios.get(API_URL + 'user',{
        headers: authHeader(),
    },
    ).then((response) => {
        console.log(response);
        return response.data.Posts;
    });
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
