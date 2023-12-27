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
