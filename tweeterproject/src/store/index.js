import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Login state
    isLoggedin: true,
  
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    autehticated: function(state){
      return state.isLoggedin
    }
  }
})
