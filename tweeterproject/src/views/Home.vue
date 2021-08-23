<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <div id="nav">
      <router-link to="/SignIn">Sign In</router-link> |
      <router-link to="/">Home</router-link> |
      <router-link to="/Profile">Profile</router-link> |
      <router-link to="/Feed">Feed</router-link> |
      <router-link to="/Discovery">Discovery</router-link> |
    </div>
    <router-view/>
    <Profile/>
    <button @click="printKey">Click</button>
    <button @click="makeReq">Make Req</button>
  </div>
</template>

<script>
// @ is an alias to /src
import Profile from './Profile.vue'
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    Profile
  },
  methods: {
    printKey() {
      console.log(process.env.VUE_APP_API_KEY);
       console.log("this worked");
    },
    makeReq () {
      axios.request ({
      url: "https://tweeterest.ml/api/users",
      method: "GET",
      headers: {
        'X-Api-Key': process.env.VUE_APP_API_KEY
      }, 
    }).then((response) =>{
      console.log(response);
    }).catch((err)=>{
      console.error(err);
    })
  }
}
}
</script>
    