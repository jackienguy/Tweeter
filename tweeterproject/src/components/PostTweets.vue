<template>
  <div>
      <!-- User post input box -->
      <v-container fluid>
        <v-list-item-avatar>
                <v-img src="https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"></v-img>
                </v-list-item-avatar>
        <v-textarea
            v-model="content" 
            placeholder="What's happening?"
            counter: maxlength="200"
        ></v-textarea>
        <v-btn @click="postTweet">Post</v-btn>
      </v-container>
      <v-divider></v-divider> 
      <UserTweets :tweets="tweets"/>

    </div>
</template>

<script>
import axios from 'axios';
import cookies from 'vue-cookies'
import UserTweets from './UserTweets.vue';

  export default {
      name: "PostTweets",
      components: {
        UserTweets
      },
      data () {
        return {
          content: '',
          tweets: [
            { header: 'Tweets' },
            {
            imageUrl: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',  
            username: "",
            tweet: '',
            createdAt: '',
            },
            { divider: true, inset: true },
          ] 
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
                    loginToken: cookies.get('loginToken'),
                    content: this.content
                }
              }).then((response)=>{
                  console.log(response);
                  console.log(response.data.content);
                  console.log('you posted');
                  
              }).catch((err)=>{
                  console.error(err);
              })
          },
          
            
      }
  }

</script>