<template>
<div class="pb-10">
  <v-card
    class="mx-auto"
    color="#26c6da"
    dark
    width="70vw"
  >
    <v-card-title>
      <v-icon
        large
        left
      >
        mdi-twitter
      </v-icon>
      <span class="text-h6 font-weight-light">Kwitter</span>
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
            :src="userImageUrl"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{username}}</v-list-item-title>
          <v-list-item-title>{{createdAt}}</v-list-item-title>
        </v-list-item-content>

        <v-row
          align="center"
          justify="end"
        >
     <!--Comment button  -->
            
            <v-btn
            @click="isExpanded = !isExpanded"
            class="ma-2"
            text
            icon
            >
            <v-icon
                
                small
                color="white darken-2"
            >
                far fa-comment-alt
            </v-icon>
            </v-btn>
    <!-- Like/Unlike button -->
        <div>
      
                <v-btn
                @click="likedTweet"
                class="likeClicked"
                text
                icon
                >
                <v-icon
                small
                color="white darken-2"
                >
                    far fa-thumbs-up
                </v-icon>
                </v-btn>
        
         
            <LikesCounter/>

                <v-btn
                @click="unlikedTweet(tweetId)"
                class="unlikeClicked"
                text
                icon
                >
                <v-icon
                small
                color="white darken-2"
                >
                    far fa-thumbs-up
                </v-icon>
                </v-btn>
        
        </div>
    <!-- Edit tweet button -->
            <v-btn
            @click="editTweet"
            class="ma-2"
            text
            icon
            >
            <v-icon
            small
            color="white darken-2"
            >
                  far fa-edit
            </v-icon>
            </v-btn>
    <!-- Delete buttm -->
            <v-btn
            @click="deleteTweet"
            class="ma-2"
            text
            icon
            >
            <v-icon
            small
            color="white darken-2"
            >
                far fa-trash-alt
            </v-icon>
            </v-btn>
    <!-- Expand comment button -->
            <v-btn
            @click="isExpanded = !isExpanded"
             class="ma-2"
            icon
            outlined
            >
             <v-icon
            small
            color="white darken-2"
            >
                fas fa-angle-down
            </v-icon>
            </v-btn>
        </v-row>
      </v-list-item>

    <v-divider></v-divider>

   
       
    </v-card-actions>
    </v-card>
        <CommentsOnTweets
        :tweetId="tweetId"
        :isExpanded="isExpanded"
        />
</div>
</template>

<script>
import axios from 'axios';
import cookies from 'vue-cookies';
import LikesCounter from './LikesCounter.vue'

import CommentsOnTweets from "./CommentsOnTweets.vue";

    export default {
        //
        name: "TweetBody",
        components: {
            CommentsOnTweets,
            LikesCounter
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
                isLiked: false,
                isExpanded: false,
                // numLikes: 0
            }  
        },
        methods: {
        // Liking a tweet
            likedTweet () {
                axios.request({
                    url: "https://tweeterest.ml/api/tweet-likes",
                    method: "POST",
                     headers: {
                        'X-Api-Key': process.env.VUE_APP_API_KEY,
                        "Content-Type": "application/json"
                    },
                    data: {
                        loginToken: cookies.get('loginToken'),
                        tweetId: this.tweetId
                    }
                }).then((response)=>{
                    console.log("You liked a tweet" +response);
                    this.isLikedTweet = !this.isLikedTweet;
               
                }).catch((err)=>{
                     console.error("Already liked the tweet" +err);
                })
                // this.numLikes += 1;
            },
            // unliking a tweet
            unlikedTweet () {
                axios.request({
                    url: "https://tweeterest.ml/api/tweet-likes",
                    method: "DELETE",
                     headers: {
                        'X-Api-Key': process.env.VUE_APP_API_KEY,
                        "Content-Type": "application/json"
                    },
                    data: {
                        loginToken: cookies.get('loginToken'),
                        tweetId: this.tweetId
                    }
                }).then((response)=>{
                    console.log("unliked" +response);
                }).catch((err)=>{
                    console.error(err);
                })
            },
            // Deleting a Tweet
            deleteTweet () {
                axios.request ({
                    url: "https://tweeterest.ml/api/tweets",
                    method: "DELETE",
                    headers: {
                        'X-Api-Key': process.env.VUE_APP_API_KEY
                    },
                    data: {
                        loginToken: cookies.get('loginToken'),
                        tweetId: this.tweetId
                    }
                }).then((response)=> {
                    console.log("Tweet deleted"+response);
                }).catch((err)=>{
                    console.error(err);
                })
            },
            // Editing a tweet
            editTweet() {
               axios.request({
                   url: "https://tweeterest.ml/api/tweets",
                   method: "PATCH",
                   headers: {
                       'X-Api-Key': process.env.VUE_APP_API_KEY
                   },
                   data: {
                       loginToken: cookies.get('loginToken'),
                       tweetId: this.tweetId,
                       content: this.content
                   }
               }).then((response)=>{
                    console.log(response);
                    console.log("You edited");
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