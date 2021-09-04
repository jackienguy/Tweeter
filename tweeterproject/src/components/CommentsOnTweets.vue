<template>
    <div v-if="isExpanded">
        <CommentReplyBox 
         :tweetId="tweetId"
         :isExpanded="isExpanded"
         @replyToTweet="getCommentOnTweet"
         />

        <CommentBody
        v-for="comment in comments" 
        :key="comment.tweetId"
        :commentId="comment.commentId"
        :tweetId="comment.tweetId"
        :userId="comment.userId"
        :username="comment.username"
        :content="comment.content"
        :createdAt="comment.createdAt"
        />
    </div>
</template>

<script>
import axios from 'axios';
import CommentBody from './CommentBody.vue'
import CommentReplyBox from './CommentReplyBox.vue'

    export default {
        name: "CommentsOnTweets",
        components: {
            CommentBody,
            CommentReplyBox
        },
        props: {
            tweetId: Number,
            isExpanded: Boolean
        },
        data(){
            return {
                comments: [],
            }
        },
        mounted(){
            this.getCommentOnTweet();
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