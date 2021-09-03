import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false
  },
  mutations: {
    setAuth (state, status) {
        state.isAuthenticated = status;
    }
  },
  actions: {
    
  },
  getters: {
   
  }
})
