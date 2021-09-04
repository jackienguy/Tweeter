<template>
    <div>
        <UserInfo
        v-for="user in users"
        :key="user.userId"
        :userId="user.userId"
        :bio="user.bio"
        :username="user.username"
        :email="user.email"
        :password="user.password"
        :birthdate="user.birthdate"
        :imageUrl="user.imageUrl"
        :bannerUrl="user.bannerUrl"
        />
    </div>
</template>

<script>
import UserInfo from './UserInfo.vue';
import axios from "axios";
import cookies from "vue-cookies";

    export default {
        name: "UserInfoSheet",
        components: {
            UserInfo,
        },
        data () {
            return {
                users: [],
                id: this.$route.params.id
            }
        },
        created (){
            this.getUserData();
        },
        methods: {
        getUserData() {
            axios.request({
                url: "https://tweeterest.ml/api/users",
                method: "GET",
                headers: {
                    'X-Api-Key': process.env.VUE_APP_API_KEY,
                },
                params: {
                    userId: this.userId,
                }
            }).then((response)=> {
                cookies.get('loginToken');
                console.log(response);
                console.log("successfully got info");
            }).catch((err)=> {
                console.error(err);
            })
        },
        // delete profile
      deleteProfile(){
        axios.request({
            url: "https://tweeterest.ml/api/users",
            method: "DELETE",
            headers: {
              'X-Api-Key': process.env.VUE_APP_API_KEY,
              'Content-Type': "application/json"
            },
            data: {
              'loginToken': cookies.get('loginToken'),
              'password': this.password
            }
          }).then((response)=> {
              console.log(response);
              console.log("log out success");
              this.$router.push('/Register')
          }).catch((err)=>{
              console.error(err);
          })
        }
    }
      
}
</script>

<style lang="scss" scoped>

</style>