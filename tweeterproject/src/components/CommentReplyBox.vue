<template>
  <div v-if="isExpanded" >
        <!-- Tweet comment input box -->
        <v-container fluid>
          <v-list-item-avatar>
                  <v-img src="https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"></v-img>
                  </v-list-item-avatar>
          <v-textarea 
              v-model="content" 
              placeholder="Add a comment"
              counter: maxlength="200"
          ></v-textarea>
          <v-btn @click="replyToTweet">Reply</v-btn>
        </v-container>
        <v-divider></v-divider> 
        {{tweetId}}
        
    </div>
</template>

<script>

import axios from 'axios';
import cookies from 'vue-cookies';


    export default {
        name: "CommentReplyBox",
        props: {
            tweetId: Number,
            isExpanded: Boolean
        },
    
        data(){
          return {
            content: '',
        
          }
        },
        methods: {
          replyToTweet () {
             
              axios.request({
                  url: "https://tweeterest.ml/api/comments",
                  method: "POST",
                  headers: {
                      'X-Api-Key': process.env.VUE_APP_API_KEY,
                      "Content-Type": "application/json"
                  },
                  data: {
                      loginToken: cookies.get('loginToken'),
                      tweetId: this.tweetId,
                      content: this.content
                  }
              }).then((response)=>{
                  console.log(response);
                  console.log("You commented on a post");
                  this.$emit('replyToTweet', this.content);
                  this.content = '';
              }).catch((err)=>{
                  console.error(err.response);
              })
            },
           
      }
  }
  
</script>

<style lang="scss" scoped>

</style>