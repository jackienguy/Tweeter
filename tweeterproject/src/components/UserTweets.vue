<template>
    <div>
        <div>
            <TweetBody 
            v-for="tweet in tweets" 
            :key="tweet.tweetId" 
            :content="tweet.content" 
            :createdAt="tweet.createdAt" 
            :username="tweet.username"
            :tweetId="tweet.tweetId"
            :userId="tweet.userId"
            />
        </div>>
    </div>
    
</template>

<script>
import axios from 'axios';
import TweetBody from "./TweetBody.vue";

    export default {
        name: "UserTweets",
        components: { 
            TweetBody,
        },
        data (){
            return{
                tweets: [],
            }
        },
         mounted () {
            this.getTweets();
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
                    userId: this.tweets.userId,
                }
            }).then((response)=>{
                console.log(response.data);
                this.tweets = response.data
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