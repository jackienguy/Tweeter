<template>
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
</template>

<script>
import axios from 'axios';
import cookies from 'vue-cookies';

    export default {
        name: "TweetReaction",
        props: {
            tweets: {
                type: Array
            }
        },
        methods: {
        // Liking a tweet
            likeTweet () {
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
                    this.tweetId = response.data.tweetId
                }).catch((err)=>{
                    console.error(err);
                })
            }, 
        }
    }
</script>

<style lang="scss" scoped>

</style>