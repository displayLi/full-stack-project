import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  SET_AUTHENTICATED: 'SET_AUTHENTICATED',
  SET_USER: 'SET_USER'
};

export default new Vuex.Store({
  state: {
    user: {},
    isAuthorization: false,
    labelDatas: []
  },
  getters: {
    user: state => state.user,
    isAuthorization: state => state.isAuthorization,
    labelDatas: state => state.labelDatas
  },
  mutations: {
    [types.SET_AUTHENTICATED](state, isAuthorization) {
      if (isAuthorization) state.isAuthorization = isAuthorization;
      else state.isAuthorization = false;
    },

    [types.SET_USER](state, user) {
      if (user) state.user = user;
      else state.user = {}
    },
    // 修改
    getLabelDatas(state, labelDatas) {
      if (state.labelDatas.length > 0) {
        let index = state.labelDatas.findIndex(index => index._id == labelDatas._id);
        index == -1 ? false : state.labelDatas.splice(index, 1, labelDatas);
      }
      state.labelDatas = labelDatas;
    },
    // 删除
    delLabelDatas(state, labelDatas) {
      if (state.labelDatas.length > 0) {
        let index = state.labelDatas.findIndex(index => index._id == labelDatas._id);
        index == -1 ? false : state.labelDatas.splice(index, 1)
      }
      state.labelDatas = labelDatas;
    },
    // 添加
    addLabelDatas(state, labelDatas) {
      state.labelDatas.unshift(labelDatas);
    }
  },
  actions: {
    setAuthorization({ commit }, Authorization) {
      commit(types.SET_AUTHENTICATED, Authorization);
    },
    setUser({ commit }, user) {
      commit(types.SET_USER, user);
    },
    logoutUser({ commit }) {
      commit(types.SET_AUTHENTICATED, false);
      commit(types.SET_USER, null);
    }
  }
})
