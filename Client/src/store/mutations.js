const loggedIn = (state, user) => {
    state.data.user = user;
    state.data.isLogged = true;
}

const loggedOut = (state) => {
    state.data.user = null;
    state.data.isLogged = false;
}