
<template>
  <div class="ma-12 pa-12">
    <v-card>
      <v-navigation-drawer
        permanent
      >
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img src='https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'></v-img>
            </v-list-item-avatar>
            <v-btn @click="editProfileBtn">Edit</v-btn>
          </v-list-item>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                <b>{{this.username}}</b> 
              </v-list-item-title>
              <v-list-item-subtitle>{{this.email}}</v-list-item-subtitle>
              <v-list-item-subtitle>{{this.bio}}</v-list-item-subtitle>

            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
          nav
          dense
        >
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My Tweets</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Discover</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-title> <v-btn @click="logOut">Log Out</v-btn></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    <v-card
      elevation="2"
    ></v-card>
     <v-card
      elevation="2"
    ></v-card>
    <div>
      <UserTweets/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import UserTweets from "../components/UserTweets.vue"

  export default {
    //
    components: {
      UserTweets
    },
    data () {
      return {
        userId: '',
        bio: '',
        username: '',
        email: ''
      }
    },
    created (){
      this.getUserData()
    },
    methods: {
      editProfileBtn() {
         this.$router.push("/EditProfile");
      },
      getUserData() {
          axios.request({
              url: "https://tweeterest.ml/api/users",
              method: "GET",
              headers: {
                  'X-Api-Key': process.env.VUE_APP_API_KEY,
              },
              params: {
                  userId: "1229",
                  bio: this.bio,
                  username: "response.data[0].username"
              }
          }).then((response)=> {
              cookies.get('loginToken'),
              console.log("got the user info"); 
              console.log(response);
              this.username = response.data[0].username;
              this.email = response.data[0].email;
              this.bio = response.data[0].bio
          }).catch((err)=> {
              console.error(err);
          })
        },
        logOut(){
          axios.request({
              url: "https://tweeterest.ml/api/users",
              method: "DELETE",
              headers: {
                'X-Api-Key': process.env.VUE_APP_API_KEY,
                'Content-Type': "application/json"
              },
              data: {
                'loginToken': 'aiAakhG865LmH96dVMpyp5jTaLrr9baf4A5jjpstDRd1nSr5yX',
                'password': "I am hulk"
              }
            }).then((response)=> {
              console.log(response);
              console.log("log out success");
              this.$router.push('/Signin')
            }).catch((err)=>{
              console.error(err);
            })
        }
    }
    
  }
</script>
