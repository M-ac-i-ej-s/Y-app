import { socket } from "../socket.js";

const loggedIn = (state, user) => {
    state.data.user = user;
    state.data.isLogged = true;
}

const reLogUser = (state, user) => {
    state.data.user = {user: user, token: state.data.user.token};
}

const loggedOut = (state) => {
    state.data.user = null;
    state.data.isLogged = false;
}

export default {
    loggedIn,
    loggedOut,
    reLogUser,
}