<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
    >
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
     
      <v-divider></v-divider>

    <v-list
          dense
          nav
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-btn @click="logout">Logout</v-btn>
    </v-navigation-drawer>

<!-- User profile main body -->
    <v-main>
        <newTweets/>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import newTweets from "../components/newTweets.vue";
import UserInfo from "../components/UserInfo.vue";

  export default {
    //
    components: {
      newTweets,
      UserInfo
    },
    data () {
      return {
        items: [
          { title: 'Home', icon: 'fas fa-home', to: '/Home' },
          { title: 'Discovery', icon: 'fas fa-hashtag', to: '/Discovery' },
        ],
        drawer: null, 
        users: []
      }
    },
    created (){
      this.getUserData()
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
      // log out
      logout (){
            cookies.remove.loginToken;
            cookies.remove.username;
            this.$router.push("/");
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
