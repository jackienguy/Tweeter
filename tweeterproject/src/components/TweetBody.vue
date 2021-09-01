<template>
    <div>
        <v-card
        max-width="550"
        height="200"
        class="mx-auto"
        >
        <v-list three-line>
            <div> 
                <v-list-item>
                    <v-list-item-avatar>
                    <v-img :src="userImageUrl">{{userImageUrl}}</v-img>
                    </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title><b>{{username}}</b></v-list-item-title>
                    <v-list-item-subtitle >{{content}}</v-list-item-subtitle>
                    <v-list-item-subtitle >{{createdAt}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
          </div>
        </v-list>

    <!-- Reaction Buttons -->
        <div>
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
                v-if="isLikedTweet"
                @click="likeTweet(tweetId)"
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
                v-else
                @click="unlikedTweet(tweetId)"
                class="ma-2-1"
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
                @click="deleteTweet()"
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
import cookies from 'vue-cookies';

    export default {
        name: "TweetBody",
        props: {
            tweetId: Number,
            content: String,
            createdAt: String,
            tweetImageUrl: String,
            userId: Number,
            userImageUrl: String,
            username: String    
        },
        data () {
            return {
                isLikedTweet: true
            }
        },
        methods: {
        // Liking a tweet
            likeTweet (Id) {
                axios.request({
                    url: "https://tweeterest.ml/api/tweet-likes",
                    method: "POST",
                     headers: {
                        'X-Api-Key': process.env.VUE_APP_API_KEY,
                        "Content-Type": "application/json"
                    },
                    data: {
                        loginToken: cookies.get('loginToken'),
                        tweetId: Id
                    }
                }).then((response)=>{
                    console.log("You liked a tweet" +response);
                    
                }).catch((err)=>{
                     console.error("Already liked the tweet" +err);
                })
            },
            // unliking a tweet
            unlikedTweet (Id) {
                axios.request({
                    url: "https://tweeterest.ml/api/tweet-likes",
                    method: "DELETE",
                     headers: {
                        'X-Api-Key': process.env.VUE_APP_API_KEY,
                        "Content-Type": "application/json"
                    },
                    data: {
                        loginToken: cookies.get('loginToken'),
                        tweetId: Id
                    }
                }).then((response)=>{
                    console.log("You liked a tweet" +response);
                }).catch((err)=>{
                    console.error(err);
                })
            },
            // Deleting a Tweet
            deleteTweet (id) {
                axios.request ({
                    url: "https://tweeterest.ml/api/tweets",
                    method: "DELETE",
                    headers: {
                    'X-Api-Key': process.env.VUE_APP_API_KEY
                    },
                    data: {
                        loginToken: cookies.get('loginToken'),
                        tweetId: this.tweets.tweetId
                    }
                }).then((response)=> {
                    console.log("Tweet deleted"+response);
                    this.$delete('this.tweetId', id)
                }).catch((err)=>{
                    console.error(err);
                })
            }, 
        }
    }
</script>

<style lang="scss" scoped>
//  #ma-2{
//      color: blue;
//  }
//  #ma-2-1{
//      color: gray;
//  }
</style>