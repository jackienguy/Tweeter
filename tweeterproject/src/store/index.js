import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   user: [
     {
      userId: "",
      email: "",
      username: "",
      bio: "",
      birthdate: "",
     }
   ]
  },
  mutations: {
    updateUsername: function(state, newUsername){
      state.username = newUsername;
    }
  },
  actions: {
    editUsername(context, newUsername) {
      console.log("user updated");
      context.commit('updateUsername', newUsername)
    }
  },
  getters: {
    authUser(state) {
      return state.user
    }
  }
})
