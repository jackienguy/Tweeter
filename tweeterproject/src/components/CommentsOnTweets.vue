<template>
    <div>
        <CommentBody2
        v-for="comment in comments"
        :key="comment.commentId"
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
import CommentBody2 from './CommentBody2.vue'

    export default {
        name: "CommentsOnTweets",
        components: {
            CommentBody2
        },
        data(){
            return {
                comments: []
            }
        },
        mounted(){
            this.addComment();
        },
        methods: {
            addComment() {
                axios.request({
                    url: "https://tweeterest.ml/api/comments",
                    method: "GET",
                    headers: {
                        'X-Api-Key': process.env.VUE_APP_API_KEY
                    },
                    params: {
                        tweetId: this.comment.tweetId
                    }
                }).then((response)=>{
                    console.log(response.data);
                    this.comments = response.data;
                    console.log("You replied");
                }).catch((err)=>{
                    console.error(err);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>