<template>
    <div>
        <LikesCountBody
        :numLikesCount="numLikesCount"
        :tweetId="tweetId"
        />
    </div>
</template>

<script>
import LikesCountBody from './LikesCountBody.vue';
import axios from 'axios';
import cookies from 'vue-cookies';

    export default {
    components: { LikesCountBody },
            name: "LikesCounter",
            props: {
                tweetId: Number,
                numLikesCount: {
                    type: Number,
                    defaul: 0,
                },
            },
            mounted(){
                this.getLikeCount();
            },
            methods: {
                getLikeCount() {
                    axios.request({
                        url: "https://tweeterest.ml/api/tweet-likes",
                        method: "GET",
                        headers: {
                            'X-Api-Key': process.env.VUE_APP_API_KEY
                        },
                        params: {
                            tweetId: this.tweetId
                        }
                    }).then((response)=>{
                        console.log(response);
                        console.log("got the likes");
                        cookies.get('numLikesCount')
                    }).catch((err)=>{
                        console.err(err);
                    })
                }
            }
    }
</script>

<style lang="scss" scoped>

</style>