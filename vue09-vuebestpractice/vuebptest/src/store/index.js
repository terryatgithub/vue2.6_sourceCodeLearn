import Vue from 'vue'
import Vuex from 'vuex'
import { login } from 'util/auth'
import { setCookie }   from 'util/cookie'
Vue.use(Vuex)

const state = {
    token: undefined,
    userInfo: null
}

const mutations = {
    ['SETTOKEN'](state, value) {
        state.token = value
    },
    ['SETUSERINFO'](state, userInfo) {
        state.userInfo = userInfo
    }
}

const getters = {

}
const actions = {
    async setToken({ commit }, value) {
        let token = await login(value)
        if (token) {
            setCookie('token', value + Math.random())
            commit('SETTOKEN', value)
        }
    },
    setUserInfo({ commit }, userInfo) {
        commit('SETUSERINFO', userInfo)
    }
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

