<template>
  <v-container fluid>
    <v-textarea
      name="input-7-1"
      filled
      label="Label"
      auto-grow
      value=""
    ></v-textarea>
    <v-btn @click="postTweet">Post</v-btn>
    
  </v-container>
</template>

<script>
import axios from 'axios';
  export default {
      name: "UserTweets",
      data () {
          return {
              loginToken: '',
              content: '',
          }
      },
      methods: {
          postTweet () {
              axios.request({
                  url: "https://tweeterest.ml/api/tweets",
                  method: "POST",
                  headers: {
                    'X-Api-Key': process.env.VUE_APP_API_KEY,
                    "Content-Type": "application/json"
                    },
                    data: {
                        loginToken: "aiAakhG865LmH96dVMpyp5jTaLrr9baf4A5jjpstDRd1nSr5yX",
                        content: 'This is my first post',
                    }
                }).then((response)=>{
                    console.log(response);
                    console.log("You posted a tweet");
                }).catch((err)=>{
                    console.error(err);
                })
          }
      }
  }

</script>