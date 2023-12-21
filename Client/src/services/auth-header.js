import store from '../store'

export default function authHeader() {
    const currentUser = store.state.data;
    if (currentUser.user) {
        const token = currentUser.user.token;
        if (token) {
            return { 'access-token': token };
        } else {
            return {};
        }
    }
}