import * as types from './mutation-types'

const mutations = {
    [types.SET_USER] (state, user) {
        state.user = user
    },
    [types.SET_BASEURL] (state, baseUrl) {
        state.baseUrl = baseUrl
    }
}

export default mutations
