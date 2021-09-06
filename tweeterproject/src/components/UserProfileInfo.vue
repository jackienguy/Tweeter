<template>
    <div>
        <UserInfoBody
        v-for="user in users"
        :key="user.userId"
        :userId="user.userId"
        :email="user.email"
        :username="user.email"
        :bio="user.bio"
        :birthdate="user.birthdate"
        :imageUrl="user.imageUrl"
        />
    </div>
</template>

<script>
import UserInfoBody from './UserInfoBody.vue';
import axios from 'axios'

    export default {
        name: "UserProfileInfo",
        components: {
            UserInfoBody
        },
        data () {
            return {
                users: []
            }
        },
        mounted () {
            this.getUserInfo();
        },
        methods: {
            getUserInfo() {
                axios.request ({
                    url: "https://tweeterest.ml/api/users",
                    method: "GET",
                    headers: {
                        'X-Api-Key': process.env.VUE_APP_API_KEY
                    },
                    params: {
                        userId: this.userId
                    },
                }).then((response)=>{
                    console.log(response);
                    console.log("got user date");
                }).catch((err)=>{
                    console.error(err);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>