//zhuyuxin
import Vue from 'vue'

import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '@/utils/ma/accessToken'
import { userInfo } from '@/api/ma/common'
const state = () => ({
  accessToken: getAccessToken(),
  username: '',
  avatar: '',
})

const getters = {
  accessToken: (state) => state.accessToken,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
}

const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
    setAccessToken(accessToken)
  },
  setUsername(state, username) {
    state.username = username
  },
  setAvatar(state, avatar) {
    state.avatar = avatar
  },
}

const actions = {
  async getAccessToken({ commit }, token) {
    commit('setAccessToken', token)
  },
  async getUserInfo({ commit }) {
    const { data } = await userInfo()
    commit('setUsername', data.username)
  },
  async logout({ dispatch }) {
    await dispatch('resetAccessToken')
  },
  resetAccessToken({ commit }) {
    commit('setAccessToken', '')
    removeAccessToken()
  },
}
export default { state, getters, mutations, actions }
