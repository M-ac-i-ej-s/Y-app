import { createStore, createLogger } from 'vuex'
import mutations from './mutations'
import createPersistedState from 'vuex-persistedstate'

const state = {
    data: {
        user: null,
        isLogged: null,
    }
}

export default createStore({
    plugins: [
        createLogger(),
        createPersistedState({
            storage: window.sessionStorage,
    })],
    state,
    mutations,
})