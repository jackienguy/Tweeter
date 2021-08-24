<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->

  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'Home',
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
    