import axios from "axios";
import authHeader from "./auth-header";
const API_URL = 'http://localhost:3001/users/';

const getUser = async (login) => {
    await axios.get(API_URL + login,{
        headers: authHeader(),
    }).then((response) => {
        return response.data.User;
    });
}

export default getUser;