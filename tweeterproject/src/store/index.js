import Vue from 'vue'
import Vuex from 'vuex'
import cookies from 'vue-cookies'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      loginToken: cookies.get('loginToken'),
      username: cookies.get('username')
    },
      
  },
  mutations: {
   
  },
  actions: {
    
  },
  getters: {
    authenticated (state) {
      return state.loginToken && state.ussername
    }
  }
})
