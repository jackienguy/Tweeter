<template>
  <div>
        <!-- Comment reply input box -->
        <v-container fluid>
          <v-list-item-avatar>
                  <v-img src="https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"></v-img>
                  </v-list-item-avatar>
          <v-textarea
              v-model="content" 
              placeholder="Reply"
              counter: maxlength="200"
          ></v-textarea>
          <v-btn @click="replyToTweet">Reply</v-btn>
        </v-container>
        <v-divider></v-divider> 
        <CommentsOnTweets/>
    </div>
</template>

<script>

import axios from 'axios';
import cookies from 'vue-cookies';
import CommentsOnTweets from './CommentsOnTweets.vue';


    export default {
        name: "CommentReplyBox",
        components: {
            CommentsOnTweets,
        },
        data(){
          return {
            commentId: '',
            tweetId: '',
            userId: '',
            username: '',
            content: '',
            createdAt: ''
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
                      tweetId: 2008,
                      content: this.content
                  }
              }).then((response)=>{
                  console.log(response);
                  console.log("You commented on a post");
              }).catch((err)=>{
                  console.error(err);
              })
          }
      }
  }
  
</script>

<style lang="scss" scoped>

</style>