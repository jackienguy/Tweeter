<template>
    <div>
        <ReplyBox
        :tweetId="tweetId"
        :isExpandedComment="isExpandedComment"
         @replyToComment="getRepliesOnComments"
        />
        <ReplyBody
         v-for="reply in replies" 
        :key="reply.tweetId"
        :commentId="reply.commentId"
        :tweetId="reply.tweetId"
        :userId="reply.userId"
        :username="reply.username"
        :content="reply.content"
        :createdAt="reply.createdAt"
        />
    </div>
</template>

<script>
import ReplyBox from './ReplyBox.vue';
import ReplyBody from './ReplyBody.vue';
import axios from 'axios';

    export default {
        name: "RepliesOnComments",
        components: {
            ReplyBox,
            ReplyBody
        },
        props: {
            tweetId: Number,
            isExpandedComment: Boolean
                },
        data(){
            return {
                replies: []
            }
        },
        mounted(){
            this.getRepliesOnComments();
        },
        methods: {
            getRepliesOnComments() {
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
                    this.replies = response.data;
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