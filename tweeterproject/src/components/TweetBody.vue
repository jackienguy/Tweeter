<template>
<div class="pb-10">
  <v-card
    class="mx-auto"
    color="#26c6da"
    dark
    max-width="800"
  >
    <v-card-title>
      <v-icon
        large
        left
      >
        mdi-twitter
      </v-icon>
      <span class="text-h6 font-weight-light">Kweeter</span>
    </v-card-title>

    <v-card-text class="text-h5 font-weight-bold">
      {{content}}
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            alt=""
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{username}}</v-list-item-title>
        </v-list-item-content>

        <v-row
          align="center"
          justify="end"
        >
          <v-icon class="mr-1">
            mdi-heart
          </v-icon>
          <span class="subheading mr-2">256</span>
          <span class="mr-1">·</span>
          <v-icon class="mr-1">
            mdi-share-variant
          </v-icon>
          <span class="subheading">45</span>
        </v-row>
      </v-list-item>

    <v-divider></v-divider>

    <!-- Reaction Buttons -->
        <div>
            <v-row class="pa-md-4 mx-lg-auto" >
                <v-btn
                @click="isDisplayBox = !isDisplayBox"
                class="ma-2"
                text
                icon
                >
                <v-icon
                    
                    small
                    color="blue darken-2"
                >
                    far fa-comment-alt
                </v-icon>
                </v-btn>
    
                <v-btn
                v-if="isLikedTweet"
                @click="likedTweet(tweetId)"
                class="likeClicked"
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
                class="unlikeClicked"
                text
                icon
                >
                <v-icon
                small
                color="blue darken-2"
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
                color="blue darken-2"
                >
                    far fa-trash-alt
                </v-icon>
                </v-btn>
            </v-row>
        </div>
        </v-card-actions>
        </v-card>
        <CommentsOnTweets
        :tweetId="tweetId"
        :isDisplayBox="isDisplayBox"
        />
        >
            <v-btn
            class="ma-2"
            outlined
            fab
            color="teal"
            >
            <v-icon>fas fa-caret-down</v-icon>
            </v-btn>
</div>
</template>

<script>
import axios from 'axios';
import cookies from 'vue-cookies';

import CommentsOnTweets from "./CommentsOnTweets.vue";

    export default {
        //
        name: "TweetBody",
        components: {
            CommentsOnTweets
        },
        props: {
            tweetId: Number,
            content: String,
            createdAt: String,
            tweetImageUrl: String,
            userId: Number,
            userImageUrl: String,
            username: String, 
        },
        data () {
            return {
                isLikedTweet: false,
                isExpanded: false
            }  
        },
        methods: {
        // Liking a tweet
            likedTweet (Id) {
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
                    this.isLikedTweet = !this.isLikedTweet
               
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
                    console.log("unliked" +response);
                    this.isLikedTweet = false
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
                        tweetId: id
                    }
                }).then((response)=> {
                    console.log("Tweet deleted"+response);
                    this.$delete('tweetId', id)
                }).catch((err)=>{
                    console.error(err);
                })
            }
            
        }, 
       
    }
</script>

<style lang="scss" scoped>
 #ma-2{
     color: blue;
 }
 #ma-2-1{
     color: gray;
 }
</style>