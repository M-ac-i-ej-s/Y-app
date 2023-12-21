import { createStore, createLogger } from 'vuex'
import mutations from './mutations'

const state = {
    data: {
        user: null,
        isLogged: null,
    }
}

export default createStore({
    state,
    mutations,
    plugins: [createLogger()]
})