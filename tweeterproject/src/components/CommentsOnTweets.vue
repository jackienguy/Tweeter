<template>
    <div>
       

        <CommentBody2
        v-for="comment in comments" 
        :key="comment.tweetId"
        :commentId="comment.commentId"
        :tweetId="comment.tweetId"
        :userId="comment.userId"
        :username="comment.username"
        :content="comment.content"
        :createdAt="comment.createdAt"
        />

        {{tweetId}}
        <CommentReplyBox 
         :tweetId="tweetId"
         :isExpanded="isExpanded"
         @replyToTweet="getCommentOnTweet"
         />
    </div>
</template>

<script>
import axios from 'axios';
import CommentBody2 from './CommentBody2.vue'
import CommentReplyBox from './CommentReplyBox.vue'

    export default {
        name: "CommentsOnTweets",
        components: {
            CommentBody2,
            CommentReplyBox
        },
        props: {
            tweetId: Number,
            isExpanded: Boolean
        },
        data(){
            return {
                comments: []
            }
        },
        mounted(){
            this.getCommentOnTweet();
        },
        methods: {
            getCommentOnTweet() {
                axios.request({
                    url: "https://tweeterest.ml/api/comments",
                    method: "GET",
                    headers: {
                        'X-Api-Key': process.env.VUE_APP_API_KEY
                    },
                    params: {
                        tweetId: this.tweetId
                    }
                }).then((response)=>{
                    console.log(response.data);
                    this.comments = response.data;
                    console.log("You replied");
                }).catch((err)=>{
                    console.error(err.response);
                })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>