import { mapActions, mapGetters } from 'vuex'

export default function authHeader() {
    const currentUser = store.getState();
    if (currentUser.persistedReducer.user) {
        const token = currentUser.persistedReducer.user.token;
        if (token) {
            return { 'access-token': token };
        } else {
            return {};
        }
    }
}