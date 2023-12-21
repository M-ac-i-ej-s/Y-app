import { createStore, createLogger } from 'vuex'
import actions from './actions'

const state = {
    data: {
        user: null,
        isLogged: null,
    }
}

export default createStore({
    state,
    actions,
    plugins: [createLogger()]
})