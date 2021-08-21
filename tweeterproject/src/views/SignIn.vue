<template>
    <div>
        <form @submit.prevent="signin">
            <h1>Log into Tweeter</h1>
            <input type="text" placeholder="Username or Email" v-model="user"/>
            <input type="password" placeholder="password" v-model="password"/>
            <button @click="login">Sign In</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import cookies from 'vue-cookies';

    export default {
        name: "SignIn",
        methods: {
            login () {
                axios.request({
                    url:"https://tweeterest.ml/api/login",
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        "email": "CindyLou@suess.com",
                        "password": "IStoleChristmas"
                    }
                }).then((response) => {
                    cookies.set('loginToken', response.data.token);
                    console.log(response.data.token);
                }).catch((err) => {
                    console.error(err);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>