<template>
  <div>
      <!-- User new tweet input box -->
      <v-container fluid>
        <v-list-item-avatar>
            <v-img src="https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"></v-img>
        </v-list-item-avatar>
        <v-row>
                <v-col
                cols="15"
                md="10"
                >
                <v-textarea 
                    v-model="content" 
                    placeholder="What's happening?"
                    counter: maxlength="200"
                    background-color="grey lighten-1"
                ></v-textarea>
                </v-col>
            </v-row>
            <v-btn @click="addNewTweet">Post</v-btn>
      </v-container>
      <v-divider></v-divider> 
      <UserTweets/>
  </div>
</template>

<script>
import axios from 'axios';
import cookies from 'vue-cookies'
import UserTweets from './UserTweets.vue';

  export default {
      name: "newTweet",
      components: {
        UserTweets
      },
      data () {
        return {
          cards: ['Today', 'Yesterday'],
          content: '',
          userImageUrl: 'https://cdn.vuetifyjs.com/images/lists/1.jpg', 
          userId:'',
          username: '',
          createdAt: '',
          imageUrl: ''
        }
      },
      methods: {
          addNewTweet () {
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
                  console.log(response.data.content);
                  console.log('you posted');
                  this.content = ''
              }).catch((err)=>{
                  console.error(err);
              })
          },
         
      }
  }

</script>