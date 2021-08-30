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

      <!-- User Posts -->
      <v-row>
        <v-col
          cols="12"
          md="6"
          offset-md="10"
        >
          <v-card>
            <v-list two-line>
              <template v-for="(item, index) in items.slice(0, 6)">
                <v-subheader
                  v-if="item.header"
                  :key="item.header"
                >
                  {{ item.header }}
                </v-subheader>
                <v-divider
                  v-else-if="item.divider"
                  :key="index"
                  :inset="item.inset"
                ></v-divider>
                <v-list-item
                  v-else
                  :key="item.title"
                >
                  <v-list-item-avatar>
                    <img :src="item.avatar">
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <strong><v-list-item-title v-html="item.title"></v-list-item-title></strong> 
                    <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                  </v-list-item-content>
                  <div class="d-flex justify-center mb-6">
                    <v-row class="pa-md-4 mx-lg-auto" >
                      <v-btn
                      class="ma-2"
                      text
                      icon
                      >
                        <v-icon
                          small
                          color="green darken-2"
                        >
                          far fa-comment-alt
                        </v-icon>
                      </v-btn>
                      <v-btn
                      class="ma-2"
                      text
                      icon
                      >
                        <v-icon
                          small
                          color="blue darken-2"
                        >
                        fas fa-retweet
                      </v-icon>
                      </v-btn>
                      <v-btn
                      class="ma-2"
                      text
                      icon
                      >
                        <v-icon
                          small
                          color="green darken-2"
                        >
                          far fa-thumbs-up
                        </v-icon>
                      </v-btn>
                      <v-btn
                      class="ma-2"
                      text
                      icon
                      >
                        <v-icon
                          small
                          color="green darken-2"
                        >
                          far fa-thumbs-down
                        </v-icon>
                      </v-btn>
                      <v-btn
                      class="ma-2"
                      text
                      icon
                      >
                        <v-icon
                          small
                          color="green darken-2"
                        >
                          far fa-trash-alt
                        </v-icon>
                      </v-btn>
                    </v-row>
                  </div>
                   
                </v-list-item>
                
              </template>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

      
     
    </div>
</template>

<script>
import axios from 'axios';
  export default {
      name: "UserTweets",
      data () {
          return {
              content: '',
              items: [
                
                { header: 'Today' },
                { 
                  avatar: 'https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80', 
                  title: 'Spiderman', 
                  subtitle: `<span class="font-weight-bold">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?` 
                },
                { divider: true, inset: true },
                { 
                  avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg', 
                  title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>', 
                  subtitle: `<span class="font-weight-bold">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`
                },
                { divider: true, inset: true },
                { 
                  avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg', 
                  title: 'Oui oui', 
                  subtitle: '' 
                },
              ],
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
                        loginToken: "iJByiVbzTa7ZXyVIQr02EX1ygl8GFBqSbN0gnHbmxYOw9Ukpk7",
                        content: this.content
                    }
                }).then((response)=>{
                    console.log(response);
                    console.log(response.data.content);
                    console.log('you posted');
                    
                }).catch((err)=>{
                    console.error(err);
                })
          }
      }
  }

</script>