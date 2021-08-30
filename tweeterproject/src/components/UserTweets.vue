<template>
    <div>
         <!-- User Posts -->
        <v-card
        max-width="450"
        class="mx-auto"
        >
        <v-toolbar
            color="cyan"
            dark
        >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>Inbox</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </v-toolbar>

        <v-list three-line>
            <template v-for="(item, index) in items"> 
            <v-subheader
                v-if="item.header"
                :key="item.header"
                v-text="item.header"
            ></v-subheader>

            <v-divider
                v-else-if="item.divider"
                :key="index"
                :inset="item.inset"
            ></v-divider>

            <v-list-item
                v-else
                :key="item.username"
            >
                <v-list-item-avatar>
                <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                <v-list-item-title v-html="item.username">{{item.username}}</v-list-item-title>
                <v-list-item-subtitle v-html="item.content">{{item.content}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            </template>
        </v-list>
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
                      @click="deleteTweet"
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
             </v-card>
    </div>
</template>

<script>

import axios from 'axios';
import cookies from 'vue-cookies'

    export default {
        name: "GetUserTweet",
        data () {
          return {
            items: [
                { header: 'Tweets' },
                {
                avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                username: '',
                content: '',
                createdAt: '' 
                },
                { divider: true, inset: true },
              ],
            tweetId: ''
        }
      },
       mounted () {
        this.getTweets();
      },
        methods: {
            getTweets () {
                axios.request({
                url: "https://tweeterest.ml/api/tweets",
                method: "GET",
                headers: {
                    'X-Api-Key': process.env.VUE_APP_API_KEY
                },
                params: {
                    userId: "1229",
                    content: this.content,
                    username: this.username,
                    createdAt: this.createdAt
                }
            }).then((response)=>{
                console.log(response);
                this.content = response.data.content;
                this.username = response.data.username;
                this.createdAt = response.data.createdAt
            }).catch((err)=>{
                console.error(err);
            })
        },
          deleteTweet () {
              axios.request ({
                url: "https://tweeterest.ml/api/tweets",
                method: "DELETE",
                headers: {
                  'X-Api-Key': process.env.VUE_APP_API_KEY
                },
                data: {
                  loginToken: cookies.get('loginToken'),
                  tweetId: "2022"
                }
              }).then((response)=> {
                  console.log("Tweet deleted"+response);
              }).catch((err)=>{
                  console.error(err);
              })
          }
    }
}
</script>

<style lang="scss" scoped>

</style>