<template>
    <div>
        <!-- User Posts -->
      <v-card
      max-width="450"
      class="mx-auto"
      >
        <v-list three-line>
          <div v-for="(tweet, index) in tweets" :key="index"> 
            <v-subheader
                v-if="tweet.header"
                :key="tweet.header"
                v-text="tweet.header"
            ></v-subheader>

            <v-divider
                v-else-if="tweets.divider"
                :key="index"
                :inset="tweets.inset"
            ></v-divider>

            <v-list-item
                v-else
                :key="tweets.username"
            >
                <v-list-item-avatar>
                <v-img :src="tweets.imageUrl"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title v-html="tweets.username">{{tweets.username}}</v-list-item-title>
                    <v-list-item-subtitle v-html="tweets.tweets">{{tweets.tweets}}</v-list-item-subtitle>
                    <v-list-item-subtitle v-html="tweets.createdAt">{{tweets.createdAt}}</v-list-item-subtitle>
                {{tweet}}
                </v-list-item-content>
            </v-list-item>
          </div>
        </v-list>
        <TweetReaction/>
      </v-card>
    </div>
</template>

<script>

import axios from 'axios';
import TweetReaction from './TweetReaction.vue'

    export default {
        name: "UserTweets",
        components: {
            TweetReaction
        },
        props: {
          tweets: {
            type: Array
          }
        },
      
        mounted () {
            this.getTweets()
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
                    }
                }).then((response)=>{
                    console.log(response);
                    this.tweets.tweet = response.data.content;
                    this.tweets.username = response.data.username;
                    this.tweets.createdAt = response.data.createdAt
                    console.log("getting content");
                }).catch((err)=>{
                    console.error(err);
                })
            },
        
      }
    
}
</script>

<style lang="scss" scoped>

</style>